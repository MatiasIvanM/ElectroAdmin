import type { FC, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import { inventory, type InventoryItem } from '../data/inventory';
import { metricsSummary, type MetricsSummary, type MonthlyMetric } from '../data/metrics';
import { adminUsers, type AdminUser } from '../data/users';

interface AuthUser {
  name: string;
  email: string;
  role: 'admin' | 'operator';
}

type TabKey = 'dashboard' | 'inventory' | 'users';

type InventoryFormState = {
  id?: string;
  name: string;
  brand: string;
  category: string;
  compatibleModels: string;
  stock: string;
  criticalStock: string;
  notes: string;
};

const tabs: { key: TabKey; label: string; icon: JSX.Element }[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-8h8V3h-8v10z" />
      </svg>
    )
  },
  {
    key: 'inventory',
    label: 'Inventario',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M3 7h18V3H3v4zm0 14h18V9H3v12zm4-9h10v2H7v-2zm0 4h6v2H7v-2z" />
      </svg>
    )
  },
  {
    key: 'users',
    label: 'Usuarios',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h10v-3c0-1.33.53-2.39 1.38-3.22C10.5 13.29 9.27 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.02 1.97 3.45v3h7v-3c0-2.66-5.33-4-8-4z" />
      </svg>
    )
  }
];

const emptyForm: InventoryFormState = {
  name: '',
  brand: '',
  category: '',
  compatibleModels: '',
  stock: '0',
  criticalStock: '0',
  notes: ''
};

const getInitialTheme = (): 'light' | 'dark' => {
  const storedTheme = localStorage.getItem('admin_theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const toCsvValue = (value: string | number) => {
  const text = String(value ?? '').replace(/"/g, '""');
  return `"${text}"`;
};

const toCsv = (items: InventoryItem[]) => {
  const header = ['name', 'brand', 'category', 'compatibleModels', 'stock', 'criticalStock', 'notes'];
  const rows = items.map((item) => [
    item.name,
    item.brand,
    item.category,
    item.compatibleModels.join('|'),
    item.stock,
    item.criticalStock,
    item.notes
  ]);
  return [header.join(','), ...rows.map((row) => row.map(toCsvValue).join(','))].join('\n');
};

const parseCsv = (raw: string): InventoryItem[] => {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return [];
  }
  const [, ...dataLines] = lines;
  return dataLines.map((line, index) => {
    const cleaned = line.replace(/^"|"$/g, '');
    const parts = cleaned.split('","').map((part) => part.replace(/"/g, ''));
    const [name, brand, category, compatibleModels, stock, criticalStock, notes] = parts;
    return {
      id: `imp-${Date.now()}-${index}`,
      name: name || 'Sin nombre',
      brand: brand || 'General',
      category: category || 'General',
      compatibleModels: (compatibleModels || '')
        .split('|')
        .map((model) => model.trim())
        .filter(Boolean),
      stock: Number(stock) || 0,
      criticalStock: Number(criticalStock) || 0,
      notes: notes || ''
    };
  });
};

const getMovingAverage = (values: number[], window = 3) => {
  if (!values.length) {
    return 0;
  }
  const start = Math.max(0, values.length - window);
  const slice = values.slice(start);
  const sum = slice.reduce((acc, value) => acc + value, 0);
  return Math.round(sum / slice.length);
};

const buildSeries = (series: MonthlyMetric[], field: keyof MonthlyMetric) => {
  return series.map((item, index) => {
    const valuesBefore = series
      .slice(0, index)
      .filter((entry) => !entry.isPartial)
      .map((entry) => Number(entry[field] || 0));
    const baseValue = Number(item[field] || 0);
    const projected = item.isPartial ? getMovingAverage(valuesBefore) : baseValue;
    return {
      label: item.label,
      value: item.isPartial ? projected : baseValue,
      isProjected: Boolean(item.isPartial)
    };
  });
};

const LineChart: FC<{ data: { label: string; value: number; isProjected?: boolean }[]; color: string }> = ({
  data,
  color
}) => {
  const width = 600;
  const height = 180;
  const paddingX = 16;
  const paddingY = 20;
  const maxValue = Math.max(...data.map((point) => point.value), 10);
  const stepX = data.length > 1 ? (width - paddingX * 2) / (data.length - 1) : 0;
  const yLabelX = 4;
  const yValues = [0, Math.round(maxValue / 2), maxValue];

  const points = data.map((point, index) => {
    const x = paddingX + stepX * index;
    const y = height - paddingY - (point.value / maxValue) * (height - paddingY * 2);
    return { ...point, x, y };
  });

  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  const lastCompleteIndex = data.findLastIndex((point) => !point.isProjected);
  const projectedPath =
    lastCompleteIndex >= 0 && lastCompleteIndex < points.length - 1
      ? `M ${points[lastCompleteIndex].x} ${points[lastCompleteIndex].y} ` +
        points
          .slice(lastCompleteIndex + 1)
          .map((point) => `L ${point.x} ${point.y}`)
          .join(' ')
      : '';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full">
      {yValues.map((value) => {
        const y = height - paddingY - (value / maxValue) * (height - paddingY * 2);
        return (
          <g key={`y-${value}`}>
            <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
            <text x={yLabelX} y={y + 4} className="text-[10px] fill-ink/60">
              {value}
            </text>
          </g>
        );
      })}
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
      {projectedPath ? <path d={projectedPath} fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 6" /> : null}
      {points.map((point) => (
        <circle key={point.label} cx={point.x} cy={point.y} r="3" fill={color} />
      ))}
      {points.map((point) => (
        <text key={`x-${point.label}`} x={point.x} y={height - 4} textAnchor="middle" className="text-[10px] fill-ink/60">
          {point.label}
        </text>
      ))}
    </svg>
  );
};

const DonutChart: FC<{ value: number; total: number }> = ({ value, total }) => {
  const size = 120;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = total ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgb(45 58 155)"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-semibold fill-ink">
        {percent}%
      </text>
    </svg>
  );
};

const AdminApp: FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem('admin_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState<InventoryFormState>(emptyForm);

  const forceMock = import.meta.env.VITE_ADMIN_MOCK === 'true';
  const isMock = useMemo(() => forceMock || !token, [forceMock, token]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('admin_theme', theme);
  }, [theme]);

  const loadMockData = () => {
    setProducts(inventory);
    setMetrics(metricsSummary);
    setUsers(adminUsers);
  };

  const loadData = async (authToken: string) => {
    try {
      const [productsResponse, metricsResponse, usersResponse] = await Promise.all([
        api.getProducts(authToken),
        api.getMetrics(authToken),
        api.getUsers(authToken),
      ]);
      setProducts(productsResponse);
      setMetrics(metricsResponse);
      setUsers(usersResponse);
    } catch (err) {
      loadMockData();
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    loadData(token);
  }, [token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    try {
      if (forceMock) {
        const mockToken = 'mock-token';
        localStorage.setItem('admin_token', mockToken);
        localStorage.setItem('admin_user', JSON.stringify({ name: 'Administrador', email, role: 'admin' }));
        setToken(mockToken);
        setUser({ name: 'Administrador', email, role: 'admin' });
        loadMockData();
        return;
      }
      const response = await api.login(email, password);
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_user', JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
    } catch (err) {
      setError('No se pudo iniciar sesion. Revisa las credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUser(null);
    setProducts([]);
    setMetrics(null);
    setUsers([]);
  };

  const handleRoleChange = async (id: string, role: 'admin' | 'operator') => {
    if (isMock) {
      setUsers((prev) => prev.map((item) => (item.id === id ? { ...item, role } : item)));
      return;
    }
    try {
      await api.updateUserRole(token || '', id, role);
      setUsers((prev) => prev.map((item) => (item.id === id ? { ...item, role } : item)));
    } catch (err) {
      setError('No se pudo actualizar el rol.');
    }
  };

  const handleExport = () => {
    const csv = toCsv(filteredProducts);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventario-electrocentro.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const text = await file.text();
    const imported = parseCsv(text);
    if (!imported.length) {
      setError('No se encontraron datos para importar.');
      return;
    }
    setProducts((prev) => [...prev, ...imported]);
    event.target.value = '';
  };

  const openCreateModal = () => {
    setFormState(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: InventoryItem) => {
    setFormState({
      id: item.id,
      name: item.name,
      brand: item.brand,
      category: item.category,
      compatibleModels: item.compatibleModels.join(' | '),
      stock: String(item.stock),
      criticalStock: String(item.criticalStock),
      notes: item.notes
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newItem: InventoryItem = {
      id: formState.id || `prd-${Date.now()}`,
      name: formState.name.trim(),
      brand: formState.brand.trim(),
      category: formState.category.trim() || 'General',
      compatibleModels: formState.compatibleModels
        .split('|')
        .map((model) => model.trim())
        .filter(Boolean),
      stock: Number(formState.stock) || 0,
      criticalStock: Number(formState.criticalStock) || 0,
      notes: formState.notes.trim()
    };

    setProducts((prev) => {
      const exists = prev.some((item) => item.id === newItem.id);
      if (exists) {
        return prev.map((item) => (item.id === newItem.id ? newItem : item));
      }
      return [newItem, ...prev];
    });
    setIsModalOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = brandFilter === 'all' || item.brand === brandFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesCritical = !criticalOnly || item.stock <= item.criticalStock;
      return matchesSearch && matchesBrand && matchesCategory && matchesCritical;
    });
  }, [products, search, brandFilter, categoryFilter, criticalOnly]);

  const uniqueBrands = Array.from(new Set(products.map((item) => item.brand)));
  const uniqueCategories = Array.from(new Set(products.map((item) => item.category)));

  const series = metrics?.monthly ?? [];
  const consultasSeries = buildSeries(series, 'consultas');
  const conversionSeries = buildSeries(series, 'conversiones');

  if (!token) {
    return (
      <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl border border-clay/70 bg-sand/80 p-8 shadow-warm">
          <h1 className="text-2xl font-headline font-semibold text-ink">Panel Electrocentro</h1>
          <p className="mt-2 text-sm text-ink/60">Acceso para administracion.</p>
          <div className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
              Email
              <input name="email" type="email" required className="rounded-2xl border border-clay/70 bg-cream px-4 py-3" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
              Password
              <input name="password" type="password" required className="rounded-2xl border border-clay/70 bg-cream px-4 py-3" />
            </label>
          </div>
          {error ? <p className="mt-4 text-sm text-secondary">{error}</p> : null}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream shadow-warm transition hover:bg-secondary"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          <p className="mt-4 text-xs text-ink/50">Modo mock: {forceMock ? 'activo' : 'automatico si falla la API'}.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell bg-cream text-ink">
      <aside className="admin-sidebar border-r border-clay/70 bg-sand/80">
        <div className="px-4 py-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Panel</p>
          <h1 className="mt-2 font-headline text-lg font-semibold text-ink">Electrocentro</h1>
        </div>
        <nav className="flex flex-col gap-2 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`admin-link flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                activeTab === tab.key ? 'bg-cream text-primary' : 'text-ink/70 hover:text-secondary'
              }`}
            >
              {tab.icon}
              <span className="admin-label">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto px-4 pb-6 pt-4">
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            className="admin-link flex items-center gap-3 rounded-2xl border border-clay/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink/70"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M6.76 4.84l-1.8-1.79-1.42 1.41 1.8 1.8 1.42-1.42zm10.48 0l1.8-1.79 1.42 1.41-1.8 1.8-1.42-1.42zM12 6a6 6 0 100 12 6 6 0 000-12zm9 5h-2v2h2v-2zm-16 0H3v2h2v-2zm10.24 8.16l1.8 1.79 1.42-1.41-1.8-1.8-1.42 1.42zm-8.48 0l-1.8 1.79-1.42-1.41 1.8-1.8 1.42 1.42zM11 3h2v2h-2V3zm0 16h2v2h-2v-2z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M21 14.5A8.5 8.5 0 0110.5 3a7 7 0 000 14A8.5 8.5 0 0021 14.5z" />
              </svg>
            )}
            <span className="admin-label">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="border-b border-clay/70 bg-cream/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">{activeTab}</p>
              <h2 className="text-2xl font-headline font-semibold">
                {activeTab === 'dashboard' && 'Resumen general'}
                {activeTab === 'inventory' && 'Inventario'}
                {activeTab === 'users' && 'Usuarios'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm text-ink/70">
                <p>{user?.name || 'Administrador'}</p>
                <p>{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-clay/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/70"
              >
                Salir
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
          {activeTab === 'dashboard' && (
            <>
              <section className="grid gap-4 md:grid-cols-4">
                <div className="rounded-3xl border border-clay/70 bg-sand/80 p-6 shadow-warm">
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary">Consultas</p>
                  <p className="mt-2 text-3xl font-semibold">{metrics?.consultas ?? 0}</p>
                </div>
                <div className="rounded-3xl border border-clay/70 bg-sand/80 p-6 shadow-warm">
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary">Conversiones</p>
                  <p className="mt-2 text-3xl font-semibold">{metrics?.conversiones ?? 0}</p>
                </div>
                <div className="rounded-3xl border border-clay/70 bg-sand/80 p-6 shadow-warm">
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary">Stock critico</p>
                  <p className="mt-2 text-3xl font-semibold">{metrics?.stockCritico ?? 0}</p>
                </div>
                <div className="rounded-3xl border border-clay/70 bg-sand/80 p-6 shadow-warm">
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary">Mas vistos</p>
                  <p className="mt-2 text-sm text-ink/70">
                    {(metrics?.productosMasVistos ?? []).slice(0, 2).join(' · ') || 'Sin datos'}
                  </p>
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Consultas mensuales</h3>
                    <span className="text-xs text-ink/50">Proyeccion con promedio movil</span>
                  </div>
                  <LineChart data={consultasSeries} color="rgb(45 58 155)" />
                </div>
                <div className="rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
                  <h3 className="text-lg font-semibold">Ratio conversion</h3>
                  <div className="mt-4 flex items-center gap-6">
                    <DonutChart value={metrics?.conversiones ?? 0} total={metrics?.consultas ?? 0} />
                    <div className="text-sm text-ink/70">
                      <p>Conversiones / Consultas</p>
                      <p className="mt-2 text-lg font-semibold text-ink">
                        {metrics?.conversiones ?? 0} / {metrics?.consultas ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Conversiones mensuales</h3>
                  <span className="text-xs text-ink/50">Mes actual proyectado</span>
                </div>
                <LineChart data={conversionSeries} color="rgb(239 122 47)" />
              </section>

              <section className="rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
                <h3 className="text-lg font-semibold">Productos mas vistos</h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-3">
                  {(metrics?.productosMasVistos ?? []).map((item) => (
                    <li key={item} className="rounded-2xl border border-clay/60 bg-sand/60 px-4 py-3 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {activeTab === 'inventory' && (
            <section className="rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Inventario</h3>
                  <p className="text-sm text-ink/60">Gestiona productos, stock critico y modelos compatibles.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream"
                  >
                    Nuevo producto
                  </button>
                  <label className="rounded-full border border-clay/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/70 cursor-pointer">
                    Import CSV
                    <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
                  </label>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="rounded-full border border-clay/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/70"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-4">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar producto o marca"
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2 text-sm"
                />
                <select
                  value={brandFilter}
                  onChange={(event) => setBrandFilter(event.target.value)}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2 text-sm"
                >
                  <option value="all">Todas las marcas</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2 text-sm"
                >
                  <option value="all">Todas las categorias</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label className="flex items-center gap-2 rounded-2xl border border-clay/70 bg-cream px-4 py-2 text-sm">
                  <input
                    type="checkbox"
                    checked={criticalOnly}
                    onChange={(event) => setCriticalOnly(event.target.checked)}
                  />
                  Mostrar stock critico
                </label>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-ink/60">
                    <tr>
                      <th className="py-2">Producto</th>
                      <th className="py-2">Marca</th>
                      <th className="py-2">Categoria</th>
                      <th className="py-2">Modelos</th>
                      <th className="py-2">Stock</th>
                      <th className="py-2">Critico</th>
                      <th className="py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((item) => (
                      <tr key={item.id} className="border-b border-clay/40">
                        <td className="py-3 font-semibold">{item.name}</td>
                        <td className="py-3">{item.brand}</td>
                        <td className="py-3">{item.category}</td>
                        <td className="py-3 text-xs text-ink/60">{item.compatibleModels.join(' · ')}</td>
                        <td className="py-3">{item.stock}</td>
                        <td className="py-3">
                          {item.stock <= item.criticalStock ? (
                            <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">Critico</span>
                          ) : (
                            item.criticalStock
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="rounded-full border border-clay/70 px-3 py-1 text-xs font-semibold text-ink/70"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="rounded-full border border-clay/70 px-3 py-1 text-xs font-semibold text-secondary"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'users' && (
            <section className="rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
              <h3 className="text-lg font-semibold">Usuarios y roles</h3>
              <div className="mt-4 space-y-3">
                {users.map((adminUser) => (
                  <div
                    key={adminUser.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-clay/60 bg-sand/60 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold">{adminUser.name}</p>
                      <p className="text-sm text-ink/60">{adminUser.email}</p>
                    </div>
                    <select
                      value={adminUser.role}
                      onChange={(event) => handleRoleChange(adminUser.id, event.target.value as 'admin' | 'operator')}
                      className="rounded-full border border-clay/70 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/70"
                    >
                      <option value="admin">Admin</option>
                      <option value="operator">Operador</option>
                    </select>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <form onSubmit={handleSave} className="w-full max-w-xl rounded-3xl border border-clay/70 bg-cream p-6 shadow-warm">
            <h3 className="text-lg font-semibold">{formState.id ? 'Editar producto' : 'Nuevo producto'}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
                Nombre
                <input
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
                Marca
                <input
                  value={formState.brand}
                  onChange={(event) => setFormState((prev) => ({ ...prev, brand: event.target.value }))}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
                Categoria
                <input
                  value={formState.category}
                  onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
                Modelos compatibles
                <input
                  value={formState.compatibleModels}
                  onChange={(event) => setFormState((prev) => ({ ...prev, compatibleModels: event.target.value }))}
                  placeholder="Modelo1 | Modelo2"
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
                Stock
                <input
                  type="number"
                  value={formState.stock}
                  onChange={(event) => setFormState((prev) => ({ ...prev, stock: event.target.value }))}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink/70">
                Stock critico
                <input
                  type="number"
                  value={formState.criticalStock}
                  onChange={(event) => setFormState((prev) => ({ ...prev, criticalStock: event.target.value }))}
                  className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
                />
              </label>
            </div>
            <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-ink/70">
              Observaciones
              <textarea
                value={formState.notes}
                onChange={(event) => setFormState((prev) => ({ ...prev, notes: event.target.value }))}
                rows={3}
                className="rounded-2xl border border-clay/70 bg-cream px-4 py-2"
              />
            </label>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-clay/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/70"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default AdminApp;
