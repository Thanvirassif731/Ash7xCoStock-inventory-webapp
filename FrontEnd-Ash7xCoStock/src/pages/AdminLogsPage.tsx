import React, { useRef } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

// AdminLogsPage.tsx
// Replicates the Figma UI shown by the user (Admin Logs page)
// - Single-file component with embedded CSS (drop-in)
// - Uses Verdana as requested earlier

const sampleLogs = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `June Reports New- Updated (${i % 2 === 0 ? '1' : '2'})`,
  date: '10-09-2025 | Wednesday',
  uploadedBy: 'Admin (Assif)',
}));

export default function AdminLogsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    // For demo: just alert. In real app, POST to API
    alert(`Selected file: ${f.name}`);
    e.currentTarget.value = '';
  };

  const handleDownload = (log: typeof sampleLogs[number]) => {
    // demo download: generate a small text file
    const content = `Log:${log.name}\nDate:${log.date}\nUploadedBy:${log.uploadedBy}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${log.name}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex admin-page-root">
      <Sidebar />

      <main className="main-content">
        <style>{`
          :root{ --bg: #f6f6f9; --frame: #dcdcdc; --card-bg: #ffffff; --strip-bg: #e9e9e9; --strip-border: #cfcfcf; --muted:#777 }
          .admin-page-root { background: var(--bg); font-family: Verdana, Geneva, Tahoma, sans-serif; }
          .main-content { margin-left: 220px; padding: 28px; box-sizing: border-box; }

          h1.page-title { font-size: 28px; margin-bottom: 18px; color: #111 }

          /* frame + card */
          .report-frame { background: var(--frame); border-radius: 22px; padding: 18px; margin-bottom: 28px; }
          .report-card { background: var(--card-bg); border-radius: 12px; padding: 18px; box-shadow: 0 6px 18px rgba(20,24,40,0.04); border: 1px solid rgba(0,0,0,0.04); }

          /* strip */
          .card-strip { display:inline-flex; align-items:center; gap:10px; background:var(--strip-bg); border-radius:12px; padding:8px 12px; border:1px solid var(--strip-border); font-weight:600; color:#2a2a2a; font-size:0.95rem; margin-bottom:12px }
          .card-strip .info-dot{ width:18px; height:18px; border-radius:50%; background:#fff; border:1px solid #ccc; display:inline-flex; align-items:center; justify-content:center; font-size:11px; color:var(--muted)}

          /* upload button style */
          .upload-wrap { display:flex; justify-content:flex-end; }
          .upload-pill { background: var(--strip-bg); border-radius: 40px; padding: 10px 18px; display:inline-flex; align-items:center; gap:12px; border:1px solid var(--strip-border); }
          .upload-btn { background:#111827; color:white; padding:8px 18px; border-radius:22px; border:none; cursor:pointer; font-weight:700 }
          .small-muted{ color:#666; font-size:0.85rem; margin-top:6px }

          /* info table inside frame */
          .info-grid { display:flex; gap:24px; align-items:flex-start; margin-top:12px }
          .info-grid dl { margin:0 }
          .info-grid dt { font-weight:700; color:#222; margin-bottom:8px }
          .info-grid dd { margin:0 0 10px 0; color:#222 }

          /* logs list */
          .logs-list { margin-top:10px }
          .logs-row { display:grid; grid-template-columns: 48px 1fr 240px 180px 120px; gap:12px; align-items:center; padding:10px 6px; border-bottom:1px dotted #e0e0e0 }
          .logs-row .idx { font-weight:700; color:#222 }
          .logs-row .name { color:#111 }
          .logs-row .meta { color:#333 }
          .logs-row a.download-link { color:#1a73e8; text-decoration:underline; font-weight:600 }

          /* responsive tweaks */
          @media (max-width: 1100px) {
            .main-content { margin-left: 0; padding: 18px }
            .logs-row { grid-template-columns: 40px 1fr 180px 140px 100px }
          }
          @media (max-width: 700px) {
            .logs-row { grid-template-columns: 32px 1fr 140px 120px 90px }
          }
        `}</style>

        <h1 className="page-title">Admin Logs</h1>

        {/* Upload / last uploaded frame */}
        <section className="report-frame">
          <div className="report-card">
            <div className="upload-wrap">
              <div className="upload-pill">
                <button className="upload-btn" onClick={handleUploadClick}>Upload ⤴</button>
                <input ref={fileInputRef} type="file" accept=".xlsx,.csv" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>
            </div>

            <div className="info-grid">
              <dl>
                <dt>Last Uploaded Date:</dt>
                <dd>10-09-2025 | Wednesday</dd>

                <dt>Last Uploaded File Name:</dt>
                <dd>June Reports New- Updated (2)</dd>

                <dt>Last Uploaded By:</dt>
                <dd>Admin (Assif)</dd>
              </dl>

              <div style={{ flex: 1 }} />

              <div style={{ textAlign: 'right' }}>
                <div className="small-muted">File upload option only supports .xlsx and .csv</div>
              </div>
            </div>
          </div>
        </section>

        {/* Logs frame */}
        <section className="report-frame">
          <div className="report-card">
            <div className="card-strip"><span>Logs</span><span className="info-dot">i</span></div>

            <div className="logs-list">
              {sampleLogs.map((log) => (
                <div key={log.id} className="logs-row">
                  <div className="idx">{log.id}</div>
                  <div className="name">{log.name}</div>
                  <div className="meta">{log.date}</div>
                  <div className="meta">{log.uploadedBy}</div>
                  <div style={{ textAlign: 'right' }}>
                    <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); handleDownload(log); }} className="download-link">Download</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
