import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart2, TrendingUp, MousePointerClick, Eye, Search,
  AlertCircle, RefreshCw, Loader2, ExternalLink, Globe2,
  BookOpen, Info, ChevronDown, ChevronUp,
} from 'lucide-react';
import { adminApi } from '../../lib/admin/api';

const T = {
  bg:           '#070b14',
  card:         'rgba(255,255,255,0.04)',
  border:       'rgba(255,255,255,0.07)',
  accent:       '#22c55e',
  accentBg:     'rgba(34,197,94,0.1)',
  accentBorder: 'rgba(34,197,94,0.25)',
  text:         '#f1f5f9',
  muted:        '#64748b',
  muted2:       '#94a3b8',
  error:        '#ef4444',
  errorBg:      'rgba(239,68,68,0.08)',
  errorBorder:  'rgba(239,68,68,0.25)',
  info:         '#60a5fa',
  infoBg:       'rgba(96,165,250,0.07)',
  infoBorder:   'rgba(96,165,250,0.2)',
  warn:         '#eab308',
  warnBg:       'rgba(234,179,8,0.08)',
  warnBorder:   'rgba(234,179,8,0.25)',
};

function fmt(n) {
  if (n == null) return '—';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function pct(f) {
  if (f == null) return '—';
  return (f * 100).toFixed(1) + '%';
}

function pos(p) {
  if (p == null) return '—';
  return p.toFixed(1);
}

function StatCard({ icon: Ic, label, value, sub, color = T.accent }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', flex: 1, minWidth: 140 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 32, height: 32, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ic size={15} style={{ color }} />
        </div>
        <span style={{ fontSize: '0.73rem', color: T.muted, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: T.text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.72rem', color: T.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function TableSection({ title, columns, rows, loading, error }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${T.border}`, fontSize: '0.8rem', fontWeight: 700, color: T.muted2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </div>
      {loading ? (
        <div style={{ padding: 32, textAlign: 'center' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: T.accent, display: 'block', margin: '0 auto 8px' }} />
          <span style={{ color: T.muted, fontSize: '0.8rem' }}>Loading...</span>
        </div>
      ) : error ? (
        <div style={{ padding: '16px 18px', color: T.error, fontSize: '0.82rem', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {error}
        </div>
      ) : rows.length === 0 ? (
        <div style={{ padding: '24px 18px', color: T.muted, fontSize: '0.82rem', textAlign: 'center' }}>No data available</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key} style={{ padding: '8px 18px', textAlign: c.align || 'left', color: T.muted, fontWeight: 500, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.02)' }}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.border}` }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {columns.map((c) => (
                    <td key={c.key} style={{ padding: '8px 18px', color: c.muted ? T.muted2 : T.text, textAlign: c.align || 'left', maxWidth: c.maxWidth || 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.render ? c.render(row[c.key], row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NotConfiguredCard({ source, missing }) {
  const setupLinks = {
    GOOGLE_SERVICE_ACCOUNT_KEY: 'https://console.cloud.google.com/iam-admin/serviceaccounts',
    GSC_SITE_URL:               'https://search.google.com/search-console',
    GA4_PROPERTY_ID:            'https://analytics.google.com/',
  };

  return (
    <div style={{ background: T.infoBg, border: `1px solid ${T.infoBorder}`, borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Info size={20} style={{ color: T.info, flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, color: T.text, marginBottom: 8, fontSize: '0.9rem' }}>
            {source === 'gsc' ? 'Google Search Console' : 'Google Analytics 4'} not connected
          </div>
          <p style={{ color: T.muted2, fontSize: '0.82rem', marginBottom: 12, lineHeight: 1.6 }}>
            Add the following environment variables in Vercel to enable live analytics:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {missing.map((key) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <code style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.border}`, borderRadius: 6, padding: '3px 8px', fontSize: '0.78rem', color: T.accent, flexShrink: 0 }}>
                  {key}
                </code>
                <a href={setupLinks[key]} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', color: T.info, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                  Setup <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: '0.76rem', color: T.muted, background: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: '10px 14px', lineHeight: 1.7 }}>
            <strong style={{ color: T.muted2 }}>Steps:</strong><br />
            1. In Google Cloud, create a service account &amp; download JSON key.<br />
            2. Base64-encode the key: <code style={{ color: T.accent }}>base64 -w 0 key.json</code><br />
            3. Add as <code style={{ color: T.accent }}>GOOGLE_SERVICE_ACCOUNT_KEY</code> in Vercel.<br />
            4. Grant the service account read access in Search Console and/or GA4.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogAnalytics() {
  const [gscData, setGscData] = useState(null);
  const [ga4Data, setGa4Data] = useState(null);
  const [gscLoading, setGscLoading] = useState(true);
  const [ga4Loading, setGa4Loading] = useState(true);
  const [gscError,   setGscError]   = useState(null);
  const [ga4Error,   setGa4Error]   = useState(null);

  const loadGSC = useCallback(async () => {
    setGscLoading(true); setGscError(null);
    try {
      const res = await adminApi.apiFetch('/admin-analytics?source=gsc');
      setGscData(res);
    } catch (err) {
      setGscError(err?.message || 'Failed to load GSC data');
    } finally {
      setGscLoading(false);
    }
  }, []);

  const loadGA4 = useCallback(async () => {
    setGa4Loading(true); setGa4Error(null);
    try {
      const res = await adminApi.apiFetch('/admin-analytics?source=ga4');
      setGa4Data(res);
    } catch (err) {
      setGa4Error(err?.message || 'Failed to load GA4 data');
    } finally {
      setGa4Loading(false);
    }
  }, []);

  useEffect(() => { loadGSC(); loadGA4(); }, []);

  const gsc = gscData?.data;
  const ga4 = ga4Data?.data;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: T.text, margin: '0 0 5px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 size={22} color={T.accent} /> Blog Analytics
          </h1>
          <p style={{ color: T.muted, fontSize: '0.8rem', margin: 0 }}>
            Google Search Console + GA4 performance data for blog posts
          </p>
        </div>
        <button onClick={() => { loadGSC(); loadGA4(); }}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 16px', color: T.muted2, cursor: 'pointer', fontSize: '0.82rem' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* ── Google Search Console ── */}
      <section style={{ marginBottom: 30 }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: T.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={14} /> Google Search Console
          {gsc?.period && <span style={{ fontWeight: 400, color: T.muted, textTransform: 'none', letterSpacing: 0 }}>— {gsc.period}</span>}
        </div>

        {gscLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: T.accent, display: 'block', margin: '0 auto 12px' }} />
            <span style={{ color: T.muted, fontSize: '0.82rem' }}>Fetching Search Console data...</span>
          </div>
        ) : !gscData?.configured ? (
          <NotConfiguredCard source="gsc" missing={gscData?.missing || ['GOOGLE_SERVICE_ACCOUNT_KEY', 'GSC_SITE_URL']} />
        ) : gscError ? (
          <div style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 10, padding: '14px 18px', color: T.error, fontSize: '0.85rem', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <AlertCircle size={15} style={{ flexShrink: 0 }} /> {gscError}
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <StatCard icon={MousePointerClick} label="Total Clicks"       value={fmt(gsc?.summary?.clicks)}      color={T.accent} />
              <StatCard icon={Eye}               label="Impressions"        value={fmt(gsc?.summary?.impressions)}  color={T.info} />
              <StatCard icon={TrendingUp}         label="Avg CTR"           value={pct(gsc?.summary?.ctr)}          color={T.warn} />
              <StatCard icon={Search}             label="Avg Position"      value={pos(gsc?.summary?.avgPosition)} sub="(lower = better)" color="#e879f9" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <TableSection
                title="Top Blog Pages by Clicks"
                loading={gscLoading}
                error={gscError}
                rows={gsc?.topPages || []}
                columns={[
                  { key: 'page', label: 'Page', maxWidth: 200, render: (v) => {
                    const slug = v?.replace(/.*\/blog\//, '');
                    return <span title={v} style={{ fontSize: '0.75rem', color: T.muted2 }}>/{slug}</span>;
                  }},
                  { key: 'clicks',      label: 'Clicks', align: 'right', render: fmt },
                  { key: 'impressions', label: 'Impr.',  align: 'right', render: fmt, muted: true },
                  { key: 'ctr',         label: 'CTR',    align: 'right', render: pct, muted: true },
                  { key: 'position',    label: 'Pos',    align: 'right', render: pos, muted: true },
                ]}
              />
              <TableSection
                title="Top Search Queries"
                loading={gscLoading}
                error={gscError}
                rows={gsc?.topQueries || []}
                columns={[
                  { key: 'query',       label: 'Query',  maxWidth: 200 },
                  { key: 'clicks',      label: 'Clicks', align: 'right', render: fmt },
                  { key: 'impressions', label: 'Impr.',  align: 'right', render: fmt, muted: true },
                  { key: 'ctr',         label: 'CTR',    align: 'right', render: pct, muted: true },
                  { key: 'position',    label: 'Pos',    align: 'right', render: pos, muted: true },
                ]}
              />
            </div>
          </>
        )}
      </section>

      {/* ── Google Analytics 4 ── */}
      <section>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: T.info, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Globe2 size={14} /> Google Analytics 4
          {ga4?.period && <span style={{ fontWeight: 400, color: T.muted, textTransform: 'none', letterSpacing: 0 }}>— {ga4.period}</span>}
        </div>

        {ga4Loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: T.info, display: 'block', margin: '0 auto 12px' }} />
            <span style={{ color: T.muted, fontSize: '0.82rem' }}>Fetching GA4 data...</span>
          </div>
        ) : !ga4Data?.configured ? (
          <NotConfiguredCard source="ga4" missing={ga4Data?.missing || ['GOOGLE_SERVICE_ACCOUNT_KEY', 'GA4_PROPERTY_ID']} />
        ) : ga4Error ? (
          <div style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 10, padding: '14px 18px', color: T.error, fontSize: '0.85rem', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <AlertCircle size={15} style={{ flexShrink: 0 }} /> {ga4Error}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <StatCard icon={Eye}      label="Blog Pageviews" value={fmt(ga4?.summary?.pageviews)} color={T.info} />
              <StatCard icon={TrendingUp} label="Sessions"    value={fmt(ga4?.summary?.sessions)}  color={T.accent} />
            </div>
            <TableSection
              title="Top Blog Posts by Pageviews"
              loading={ga4Loading}
              error={ga4Error}
              rows={ga4?.topPages || []}
              columns={[
                { key: 'page',       label: 'Page',      maxWidth: 250, render: (v) => <span style={{ fontSize: '0.78rem' }}>{v}</span> },
                { key: 'pageviews',  label: 'Pageviews', align: 'right', render: fmt },
                { key: 'sessions',   label: 'Sessions',  align: 'right', render: fmt, muted: true },
                { key: 'newUsers',   label: 'New Users', align: 'right', render: fmt, muted: true },
                { key: 'bounceRate', label: 'Bounce',    align: 'right', muted: true, render: (v) => pct(v ? v / 100 : null) },
              ]}
            />
          </>
        )}
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
