(function () {
'use strict';
const D = window.AEROVISTA_PORTFOLIO_DATA;
const L = window.AEROVISTA_LOCAL_SOURCES || {entries:[],echoStories:{editions:[]}};
const app = document.getElementById('app');
const search = document.getElementById('globalSearch');
const drawer = document.getElementById('detailDrawer');
const backdrop = document.getElementById('drawerBackdrop');
const drawerBody = document.getElementById('drawerBody');
const state = {view:'overview',query:'',family:'All families',collection:'All collections',localRole:'All roles',lifecycle:'All statuses',priority:'All priorities',kind:'All classifications',page:1};
const labels = {overview:'Portfolio Overview',collections:'Families & Collections',local:'NXCore mini.shops Sources',products:'Product Inventory',repositories:'GitHub Repository Audit',runtime:'Runtime & Hosting Audit',overlaps:'Canonical Source Crosswalk',actions:'Recommended Next Actions',methodology:'Evidence & Methodology'};
const escape = x => String(x == null ? '' : x).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url = x => /^https:\/\/(github\.com|app\.notion\.com)\//.test(String(x||'')) ? escape(x) : '#';
const cap = x => String(x||'').toLowerCase().replace(/[^a-z0-9]+/g,'-');
const badge = (s,cl) => '<span class="badge '+escape(cl||cap(s))+'">'+escape(s)+'</span>';
const ext = (target,label) => '<a href="'+url(target)+'" target="_blank" rel="noopener noreferrer">'+escape(label)+' ↗</a>';
const sectionHead = (tag,title,desc,extra) => '<div class="section-head"><div><div class="section-label">'+escape(tag)+'</div><h2>'+escape(title)+'</h2>'+(desc?'<p>'+escape(desc)+'</p>':'')+'</div>'+(extra||'')+'</div>';
const heading = (no,title,desc) => '<div class="report-heading"><div class="heading-left"><div class="eyebrow">PORTFOLIO INTELLIGENCE / '+escape(no)+'</div><h1 class="page-title">'+escape(title)+'</h1><p class="lede">'+escape(desc)+'</p></div></div>';
const namedLink = r => ext('https://github.com/aerovista-us/'+r,r);
const pct = (n,tot) => tot ? Math.round(n/tot*100) : 0;
const productFilter = () => D.products.filter(p => {
 const q=state.query.trim().toLowerCase();
 const text=[p.name,p.family,p.collection,p.summary,p.evidence,p.nextGate,p.repos.join(' '),(p.composeProjects||[]).join(' '),p.priority,p.lifecycle].join(' ').toLowerCase();
 return (!q||text.includes(q)) && (state.family==='All families'||state.family===p.family) && (state.collection==='All collections'||state.collection===p.collection) && (state.lifecycle==='All statuses'||state.lifecycle===p.lifecycle) && (state.priority==='All priorities'||state.priority===p.priority);
});
const repoFilter = () => D.repositories.filter(r => {
 const q=state.query.trim().toLowerCase();
 const text=[r.name,r.kind,r.basis,r.historicalSummary,r.historicalLane,r.links.map(x=>x.name).join(' ')].join(' ').toLowerCase();
 return (!q||text.includes(q)) && (state.kind==='All classifications'||state.kind===r.kind);
});
const count = (arr,key) => arr.reduce((a,x)=>{const n=x[key]||'Unclassified';a[n]=(a[n]||0)+1;return a;},{});
const ordered = o => Object.entries(o).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
function bars(obj,max,label){
 const all=Object.entries(obj).sort((a,b)=>b[1]-a[1]);
 return '<div class="chart-list">'+all.map(([n,v])=>'<div class="bar-row"><span class="bar-label">'+escape(n)+'</span><div class="bar-track"><span style="width:'+pct(v,max)+'%"></span></div><span class="bar-count">'+v+'</span></div>').join('')+'</div>';
}
function nav(view){
 if(!labels[view])return;
 state.view=view;state.page=1;
 for(const b of document.querySelectorAll('[data-view]')){b.classList.toggle('active',b.dataset.view===view);}
 document.getElementById('activeViewLabel').textContent=labels[view];
 document.getElementById('sidebar').classList.remove('open');
 document.getElementById('menuBtn').setAttribute('aria-expanded','false');
 render();
 window.scrollTo({top:0,behavior:'instant'});
}
function metric(label,value,foot,i){return '<div class="metric"><div class="metric-top">'+escape(label)+'<i>'+escape(i)+'</i></div><div class="metric-value">'+escape(value)+'</div><div class="metric-foot">'+escape(foot)+'</div></div>';}
function overview(){
 const prod=D.products.length,reps=D.repositories.length,active=D.products.filter(p=>p.lifecycle==='Active').length,review=D.repositories.filter(r=>r.kind==='Needs review').length;
 const fam=count(D.products,'family'),lc=count(D.products,'lifecycle'),cl=count(D.repositories,'kind');
 const colors={'Active':'#bff36e','Planning':'#92d5ce','On Hold':'#e8af7b','Completed':'#526a7b'};
 let cursor=0,stops=[];
 for(const [n,v] of ordered(lc)){const next=cursor+100*v/prod;stops.push((colors[n]||'#526a7b')+' '+cursor+'% '+next+'%');cursor=next;}
 const legend=ordered(lc).map(([n,v])=>'<div class="legend-row"><span class="legend-swatch" style="background:'+(colors[n]||'#526a7b')+'"></span><span>'+escape(n)+'</span><b>'+v+'</b></div>').join('');
 const recommendations=D.recommendations.slice(0,3);
 return '<div class="hero"><span class="hero-tag">COMPANY-WIDE / REVIEW 01</span><h1>A clearer view of <span>everything</span> we build.</h1><p>One coherent inventory across AeroVista products, internal tools, creative systems, field platforms and experiments — with GitHub lineage and release uncertainty made explicit.</p><div class="hero-foot"><span>● AUDIT SNAPSHOT READY</span><span>11 OCTOBER 2026</span><span>NOTION × GITHUB</span></div></div>'
 +'<div class="metrics">'+metric('Identified products',prod,'Canonical records · Notion','01')+metric('Accessible repos',reps,'GitHub owner enumeration','02')+metric('Active lifecycles',active,'Not a release-readiness count','03')+metric('Listing-only review',review,'Source taxonomy needs triage','04')+metric('Compose projects',D.deployments?.nxcore?.composeProjectCount||0,'NXCore Docker','05')+metric('Vercel projects',D.deployments?.vercel?.projectCount||0,'Connected scope','06')+'</div>'
 +'<div class="notice"><span class="symbol">!</span><div><strong>Lifecycle ≠ operational acceptance</strong><p>A product marked Active may still lack verified authentication, checkout, real-data QA, devices or production deployment. The source evidence and outstanding gates are recorded separately.</p></div></div>'
 +sectionHead('PORTFOLIO MIX','Where the work lives','Products categorized by intended use and operating family.')
 +'<div class="two-panels"><section class="panel"><div class="section-label" style="margin-bottom:19px">PRODUCT DISTRIBUTION / FAMILY</div>'+bars(fam,Math.max(...Object.values(fam)))+'</section><section class="panel"><div class="section-label">PRODUCT LIFECYCLE</div><div class="donut-wrap"><div class="donut" style="background:conic-gradient('+stops.join(',')+')"><div class="donut-center"><strong>'+active+'</strong><span>ACTIVE</span></div></div><div class="legend">'+legend+'</div></div></section></div>'
 +sectionHead('SOURCE ESTATE','What those repositories actually are','Every accessible repo appears in the audit — not every repo is a standalone product.','<button class="mini-link" data-jump="repositories">Browse all '+reps+' repositories →</button>')
 +'<div class="panel">'+bars(cl,Math.max(...Object.values(cl)))+'</div>'
 +sectionHead('DECISION QUEUE','Highest leverage follow-ups','Prioritized gates to increase release confidence and cut duplicated maintenance.','<button class="mini-link" data-jump="actions">Open full action list →</button>')
 +'<div class="overview-actions">'+recommendations.map((x,i)=>'<div class="action-card"><div class="number">PRIORITY / '+escape(x.priority)+' · 0'+(i+1)+'</div><h3>'+escape(x.title)+'</h3><p>'+escape(x.description)+'</p><div class="action-meta">'+badge(x.family,'')+'<button class="mini-link" data-jump="actions">Review ↗</button></div></div>').join('')+'</div>'
 +'<div class="notice" style="margin-top:30px"><span class="symbol">i</span><div><strong>Snapshot, not surveillance</strong><p>This report is a dated evidence index. It does not silently refresh GitHub, Notion, production endpoints or API secrets. See Method & Limits for provenance and update procedure.</p></div></div>';
}
function productCard(p){
 return '<article class="product-card"><div class="card-top"><span class="card-family">'+escape(p.family)+'</span><div class="badge-row">'+badge(p.priority,cap(p.priority))+badge(p.lifecycle,cap(p.lifecycle))+'</div></div><h3>'+escape(p.name)+'</h3><p>'+escape(p.summary)+'</p><div class="card-bottom"><div class="badge-row">'+badge(p.repos.length+' linked repo'+(p.repos.length===1?'':'s'))+'</div><div class="card-links"><button data-product="'+escape(p.id)+'">Full record ↗</button>'+ext(p.notionUrl,'Notion')+'</div></div></article>';
}
function opt(values,selected){return values.map(v=>'<option'+(v===selected?' selected':'')+'>'+escape(v)+'</option>').join('');}
function collectionsView(){
 const q=state.query.trim().toLowerCase();
 const fs=[...new Set(D.products.map(p=>p.family))].sort();
 const es=L.echoStories?.editions||[];
 const match=p=>!q||[p.name,p.family,p.collection,p.summary,p.lifecycle].join(' ').toLowerCase().includes(q);
 const groups=fs.map(f=>({name:f,products:D.products.filter(p=>p.family===f&&match(p))})).filter(f=>f.products.length);
 const card=p=>'<div class="collection-product"><button data-product="'+escape(p.id)+'">'+escape(p.name)+'</button><span class="collection-product-status">'+escape(p.lifecycle)+'</span></div>';
 const editions=es.filter(e=>!q||[e.name,e.kind,'EchoStories'].join(' ').toLowerCase().includes(q));
 const editionUI='<details class="edition-expander" '+(state.family==='EchoVerse & EchoStories'?'open':'')+'><summary><span>EchoStories local editions and templates</span>'+badge(editions.length+' / '+es.length+' folders')+'</summary><p class="lede" style="font-size:12px">Source-only folder records. Song/album releases and player templates are not automatically separate products, published pages or paid offerings.</p><div class="edition-grid">'+editions.map(e=>'<div class="edition-row"><strong>'+escape(e.name)+'</strong>'+badge(e.kind)+'</div>').join('')+'</div><p style="margin-top:13px">'+ext(L.echoStories?.notionUrl,'EchoStories collection program')+'</p></details>';
 const familyCards=groups.map(f=>{
 const lines=[...new Set(f.products.map(p=>p.collection||'Unassigned'))].sort();
 return '<section class="family-group"><div class="family-group-head"><div><div class="eyebrow">PORTFOLIO FAMILY</div><h2>'+escape(f.name)+'</h2><p>'+f.products.length+' products · '+lines.length+' collections</p></div><button class="mini-link" data-focus-family="'+escape(f.name)+'">Explore products ↗</button></div><div class="collection-grid">'+lines.map(line=>{
 const ps=f.products.filter(p=>(p.collection||'Unassigned')===line);
 return '<article class="collection-tile"><div class="tile-title"><h3>'+escape(line)+'</h3><span class="count-pill">'+ps.length+'</span></div><div class="collection-product-list">'+ps.map(card).join('')+'</div></article>';
 }).join('')+'</div>'+(f.name==='EchoVerse & EchoStories'?editionUI:'')+'</section>';
 }).join('');
 return heading('02','Families & collections','Navigate the portfolio by umbrella family, reusable product collection, individual application and—where applicable—release editions. Counts distinguish products from audio content and templates.')
 +'<div class="metrics">'+metric('Product families',fs.length,'Company-wide organization','01')+metric('Collections',[...new Set(D.products.map(p=>p.collection))].length,'Reusable groups','02')+metric('Products',D.products.length,'Notion Type=Product','03')+metric('EchoStories source folders',es.length,'Editions and templates','04')+'</div>'
 +'<div class="notice"><span class="symbol">i</span><div><strong>Example: EchoVerse → EchoStories → product → edition</strong><p>EchoStory is the paid-tribute storefront concept; EchoValentines is a related greeting-card application; the 33 local folders contain release pages, album experiences and player templates. They must not inflate the count of standalone apps.</p></div></div>'
 +'<p class="result-count"><strong>'+groups.length+'</strong> matching families · '+groups.reduce((a,b)=>a+b.products.length,0)+' matching product records</p>'
 +(groups.length?familyCards:'<div class="empty">No matching family or product. Clear the search.</div>');
}
function localView(){
 const q=state.query.trim().toLowerCase();
 const roles=[...new Set((L.entries||[]).map(x=>x.role))].sort();
 const items=(L.entries||[]).filter(x=>(state.localRole==='All roles'||x.role===state.localRole)&&(!q||[x.name,x.role,x.markers.join(' ')].join(' ').toLowerCase().includes(q)));
 const es=L.echoStories?.editions||[];
 const headers='<div class="data-table-wrap"><table class="data-table local-table"><thead><tr><th>Directory</th><th>Source classification</th><th>File markers</th><th>Child folders</th></tr></thead><tbody>';
 const rows=items.map(x=>'<tr><td><strong class="repo-name">'+escape(x.name)+'</strong></td><td>'+badge(x.role)+'</td><td class="secondary">'+escape(x.markers.join(', ')||'none at root')+'</td><td>'+x.subfolders+'</td></tr>').join('');
 return heading('04','NXCore mini.shops','A read-only catalog of the local source directory. This is a broader source census than GitHub alone, including client deliverables, local-only prototypes, commerce bundles, research tools and release packs.')
 +'<div class="metrics">'+metric('Top-level folders',L.directoryCount||0,'Source folders on NXCore','01')+metric('EchoStories subfolders',es.length,'Editions and templates','02')+metric('Source-labeled products',D.products.filter(p=>p.localFolders?.length).length,'New product records','03')+metric('Release acceptance', 'Separate','No assumption from files','04')+'</div>'
 +'<div class="notice"><span class="symbol">!</span><div><strong>File presence is not a deployed application</strong><p>Folder names, entry HTML files, package manifests or Compose definitions may identify prototypes, legacy snapshots, customer-specific deliverables or templates. Data excludes source bodies, local credentials and media contents.</p></div></div>'
 +'<div class="filters"><select class="filter" aria-label="Local source role" data-filter="localRole">'+opt(['All roles',...roles],state.localRole)+'</select><button class="action-button subtle" data-jump="collections">Browse grouped EchoStories →</button></div>'
 +'<p class="result-count"><strong>'+items.length+'</strong> / '+(L.directoryCount||0)+' local source directories</p>'
 +(items.length?headers+rows+'</tbody></table></div>':'<div class="empty">No matching directories.</div>')
 +sectionHead('ECHO STORIES / LOCAL','Themed experiences and templates','Listed under the EchoStories Program in Notion, not separate product records.')
 +'<div class="edition-grid">'+es.filter(e=>!q||e.name.toLowerCase().includes(q)).map(e=>'<div class="edition-row"><strong>'+escape(e.name)+'</strong><span class="secondary">'+escape(e.kind)+'</span></div>').join('')+'</div>'
 +'<p class="result-count" style="margin-top:18px">'+ext(L.echoStories?.notionUrl,'Open EchoStories collection in Notion')+'</p>';
}

function productView(){
 const q=productFilter();
 const f=[...new Set(D.products.map(p=>p.family))].sort(),collections=[...new Set(D.products.map(p=>p.collection))].sort(),lc=[...new Set(D.products.map(p=>p.lifecycle))].sort(),pri=[...new Set(D.products.map(p=>p.priority))].sort();
 return heading('02','Product inventory','All '+D.products.length+' canonical products, classified by family and portfolio lifecycle. Open a record to see repository lineage, cited evidence notes and the next acceptance gate.')
 +'<div class="filters"><select class="filter" aria-label="Product family" data-filter="family">'+opt(['All families',...f],state.family)+'</select><select class="filter" aria-label="Product collection" data-filter="collection">'+opt(['All collections',...collections],state.collection)+'</select><select class="filter" aria-label="Lifecycle status" data-filter="lifecycle">'+opt(['All statuses',...lc],state.lifecycle)+'</select><select class="filter" aria-label="Priority" data-filter="priority">'+opt(['All priorities',...pri],state.priority)+'</select></div>'
 +'<p class="result-count"><strong>'+q.length+'</strong> of '+D.products.length+' products · source evidence and actual release acceptance are separate dimensions</p>'
 +(q.length?'<div class="product-grid">'+q.map(productCard).join('')+'</div>':'<div class="empty">No products match these filters. Clear search or change the selection.</div>');
}
function repositoryView(){
 const q=repoFilter(),k=[...new Set(D.repositories.map(x=>x.kind))].sort();
 const size=22,total=Math.max(1,Math.ceil(q.length/size)),page=Math.min(state.page,total);
 const slice=q.slice((page-1)*size,page*size);
 const body=slice.map(r=>{
 const links=r.links.length?r.links.map(x=>escape(x.name)).join(', '):'<span class="quiet">—</span>';
 return '<tr><td><div class="repo-name">'+ext(r.url,r.name)+'</div><div class="secondary">'+escape(r.visibility)+' · '+escape(r.defaultBranch||'no branch')+'</div></td><td>'+badge(r.kind)+'</td><td>'+links+'</td><td><span class="secondary">'+escape(r.reviewDepth)+'</span></td><td><button class="mini-link" data-repo="'+escape(encodeURIComponent(r.name))+'">Inspect ↗</button></td></tr>';
 }).join('');
 return heading('03','GitHub repository audit','An explicit disposition for every accessible repository. Classification refers to its likely role in the portfolio, not permission to archive it or proof of runtime maturity.')
 +'<div class="filters"><select class="filter" aria-label="Repository classification" data-filter="kind">'+opt(['All classifications',...k],state.kind)+'</select></div><p class="result-count"><strong>'+q.length+'</strong> of '+D.repositories.length+' repositories · historical catalog '+escape(D.meta.historicalCatalogDate||'unknown')+' · selection is not a Git cleanup instruction</p>'
 +(q.length?'<div class="data-table-wrap"><table class="data-table"><thead><tr><th>Repository</th><th>Disposition</th><th>Product relation</th><th>Review depth</th><th>Details</th></tr></thead><tbody>'+body+'</tbody></table></div><div class="pagination"><span>Page '+page+' / '+total+'</span><button data-page="'+(page-1)+'" '+(page===1?'disabled':'')+'>← Previous</button><button data-page="'+(page+1)+'" '+(page===total?'disabled':'')+'>Next →</button></div>':'<div class="empty">No repositories matched. Clear the search or classification.</div>');
}
function runtimeView(){
 const d=D.deployments||{},nx=d.nxcore||{},v=d.vercel||{},f=d.firebase||{},q=state.query.trim().toLowerCase();
 const filt=x=>(x||[]).filter(a=>!q||JSON.stringify(a).toLowerCase().includes(q));
 const projects=filt(nx.projects),containers=filt(nx.containers),vercel=filt(v.projects),firebase=filt(f.targets);
 const total=Math.max(1,Math.ceil(containers.length/20)),pg=Math.min(state.page,total),slice=containers.slice((pg-1)*20,pg*20);
 const stat=x=>badge(x,cap(x));
 const table=(headers,rows)=>'<div class="data-table-wrap"><table class="data-table"><thead><tr>'+headers.map(h=>'<th>'+escape(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table></div>';
 return heading('04','Runtime & hosting','NXCore Docker Compose, connected Vercel deployment metadata and Firebase Hosting source configurations. These are infrastructure observations, not customer acceptance.')
 +'<div class="metrics">'+metric('Compose projects',nx.composeProjectCount||0,'NXCore project groups','01')+metric('Running containers',nx.runningContainerCount||0,'Observed on NXCore','02')+metric('Healthy checks',nx.healthCount?.healthy||0,'Explicit Docker healthy','03')+metric('Vercel projects',v.projectCount||0,'Connected scope','04')+'</div>'
 +'<div class="notice"><span class="symbol">!</span><div><strong>Runtime does not mean production-ready</strong><p>Docker checks and READY build results do not verify login, payment, end-user workflow, content security, backups or browser acceptance.</p></div></div>'
 +sectionHead('NXCORE / COMPOSE','Compose projects',projects.length+' matching projects, including partial and exited statuses.')
 +table(['Project','State'],projects.map(x=>'<tr><td class="repo-name">'+escape(x.name)+'</td><td>'+stat(x.status)+'</td></tr>'))
 +sectionHead('NXCORE / DOCKER','Running containers',containers.length+' matching containers; Docker health may be not declared.')
 +(containers.length?table(['Container','Compose project','Health','Image'],slice.map(x=>'<tr><td class="repo-name">'+escape(x.name)+'</td><td>'+escape(x.composeProject||'—')+'</td><td>'+stat(x.health)+'</td><td class="secondary">'+escape(x.image)+'</td></tr>'))+'<div class="pagination"><span>Page '+pg+' / '+total+'</span><button data-page="'+(pg-1)+'" '+(pg===1?'disabled':'')+'>← Previous</button><button data-page="'+(pg+1)+'" '+(pg===total?'disabled':'')+'>Next →</button></div>':'<div class="empty">No matching containers.</div>')
 +sectionHead('VERCEL','Projects and latest deployment evidence',vercel.length+' projects. Latest CANCELED or ERROR does not imply all earlier production deployments are down.')
 +table(['Project','Related product','Latest state','Target'],vercel.map(x=>'<tr><td class="repo-name">'+escape(x.name)+'</td><td>'+escape(x.linkedProduct||'Shared / handoff')+'</td><td>'+stat(x.latestObservedState)+'</td><td class="secondary">'+escape(x.latestTargetProduction===null?'Unverified':x.latestTargetProduction?'Production':'Preview')+'</td></tr>'))
 +'<div class="notice"><span class="symbol">i</span><div><strong>Vercel acceptance limit</strong><p>'+escape(v.limitations||'')+'</p></div></div>'
 +sectionHead('FIREBASE','Hosting targets from source config','Firebase CLI was not available on NXCore; serving deployments were not enumerated.')
 +table(['Repository','Hosting target','Configured site','Evidence'],firebase.map(x=>'<tr><td>'+escape(x.sourceRepo)+'</td><td>'+escape(x.hostingTarget)+'</td><td>'+escape(x.hostingSite)+'</td><td>'+stat('config only')+'</td></tr>'))
 +'<div class="notice"><span class="symbol">i</span><div><strong>Firebase verification limit</strong><p>'+escape(f.limitations||'')+'</p></div></div>'
 +sectionHead('TRIAGE','Service candidates','Distinct product authority still needs review.')
 +'<div class="panel"><div class="code-pills">'+(d.candidateServices||[]).map(x=>'<span>'+escape(x)+'</span>').join('')+'</div><p class="lede" style="font-size:12px;margin-top:12px">'+escape(d.scopeNotes||'')+'</p></div>';
}

function overlapsView(){
 return heading('04','Canonical source crosswalk','These repositories may appear to represent the same product. Their relation is documented to prevent duplicate product records or unsafe archive decisions.')
 +'<div class="notice"><span class="symbol">↗</span><div><strong>Dependency check before retirement</strong><p>Do not delete, rename or archive repositories based on name similarity alone. Confirm current deployed commit, media, external links, restore paths, consumers and ownership first.</p></div></div>'
 +'<div class="overlap-grid">'+D.overlaps.map((x,i)=>'<section class="overlap-item"><div class="section-label">RELATIONSHIP 0'+(i+1)+'</div><h3>'+escape(x.canonical)+'</h3><p>'+escape(x.detail)+'</p><div class="code-pills">'+namedLink(x.canonical)+x.related.map(n=>namedLink(n)).join('')+'</div></section>').join('')+'</div>';
}
function actionsView(){
 return heading('05','Priority recommendations','A bounded punch list ranked by practical impact. Each item requires evidence in its owning product repository and operational authority.')
 +'<div class="action-list">'+D.recommendations.map((r,i)=>'<div class="action-row"><div>'+badge(r.priority,cap(r.priority))+'</div><div><div class="tiny">0'+(i+1)+' / '+escape(r.family)+'</div><h3>'+escape(r.title)+'</h3></div><p>'+escape(r.description)+'</p></div>').join('')+'</div>';
}
function methodologyView(){
 return heading('06','Evidence and methodology','How the snapshot was assembled, what it reliably supports, and what remains outside a repository-only audit.')
 +'<div class="method-grid"><section class="method-card"><h3>Data authorities</h3><p><strong>Notion:</strong> the canonical AeroVista Projects database supplies product names, lifecycle, priority, description and handoff notes.</p><p><strong>GitHub:</strong> the accessible repository enumeration supplies exact repo identities; selected READMEs and source files substantiate particular capabilities.</p><p><strong>Legacy:</strong> a previous 111-repository catalog is retained as labeled July 2026 historical classification, not current execution authority.</p></section>'
 +'<section class="method-card"><h3>What the labels mean</h3><ul><li><strong>Product source:</strong> primary repository mapped to a listed product.</li><li><strong>Product related:</strong> secondary source, deployment or variant mapping.</li><li><strong>Platform/tooling:</strong> shared runtime, governance or supporting service.</li><li><strong>Content, scaffold, legacy, backup:</strong> repository purpose, not shipping status.</li><li><strong>Needs review:</strong> listing without adequate verified purpose.</li></ul></section>'
 +'<section class="method-card"><h3>Limits and uncertainty</h3><ul>'+D.meta.methods.map(t=>'<li>'+escape(t)+'</li>').join('')+'</ul><p>Repository existence, README claims, CI or a homepage response do not establish live identity, payment, accessibility, safety, device acceptance or commercial enablement.</p></section>'
 +'<section class="method-card"><h3>How to refresh</h3><p>Re-enumerate GitHub repositories, reconcile current Notion <code>Type = Product</code> records, verify changed README/source heads, annotate historical-only classifications, and regenerate <code>data/catalog.json</code> plus the portable <code>data/catalog.js</code>.</p><p>Review locally, then publish the changed static assets to GitHub. Runtime checks must be captured separately.</p></section></div>'
 +sectionHead('SOURCE LINKS','Trace the evidence','Open the canonical records and source repositories to continue validation.')
 +'<div class="panel"><div class="drawer-links">'+ext(D.meta.notionUrl,'Master Notion inventory')+ext('https://github.com/aerovista-us/Master-Product-Inventory','This report source')+ext('https://github.com/aerovista-us/github-repo-catalog','Historic repo catalog')+'</div></div>';
}
function render(){
 if(!D){app.innerHTML='<div class="notice"><strong>Data unavailable.</strong> Open this repo with its data/catalog.js file alongside index.html.</div>';return;}
 const views={overview,products:productView,repositories:repositoryView,runtime:runtimeView,collections:collectionsView,local:localView,overlaps:overlapsView,actions:actionsView,methodology:methodologyView};
 app.innerHTML=(views[state.view]||overview)();
}
function openDrawer(html){
 drawerBody.innerHTML=html;backdrop.hidden=false;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';drawer.focus();
}
function closeDrawer(){
 drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');backdrop.hidden=true;document.body.style.overflow='';
}
function productDetail(id){
 const p=D.products.find(x=>x.id===id);if(!p)return;
 const related=p.repos.length?p.repos.map(n=>namedLink(n)).join(''):'<span class="small-p">No verified exact repository crosswalk for this product.</span>';
 const runtime=(p.composeProjects||[]).map(n=>badge(n)).join('')||'<span class="small-p">No mapped Compose project.</span>';
 openDrawer('<span class="eyebrow">PRODUCT / '+escape(p.family)+'</span><h2 class="drawer-title">'+escape(p.name)+'</h2><p class="drawer-sub">Evidence and delivery gates from the canonical Notion product record.</p><div class="drawer-badges">'+badge(p.lifecycle,cap(p.lifecycle))+badge(p.priority,cap(p.priority))+badge(p.evidenceTier)+'</div><section class="drawer-block"><h4>What it does</h4><p>'+escape(p.summary)+'</p></section><section class="drawer-block"><h4>Last recorded evidence</h4><p>'+escape(p.evidence||'No detailed evidence recorded.')+'</p></section><section class="drawer-block"><h4>Next acceptance gate / outcome</h4><p>'+escape(p.nextGate||'Explicit acceptance criteria remain to be confirmed.')+'</p></section><section class="drawer-block"><h4>Linked GitHub repositories</h4><div class="drawer-links">'+related+'</div></section><section class="drawer-block"><h4>NXCore deployment associations</h4><div class="badge-row">'+runtime+'</div><p class="small-p">Service association is not end-user acceptance.</p></section><section class="drawer-block"><h4>Provenance</h4><p class="small-p">Notion reviewed: '+escape(p.lastReviewed||'not recorded')+'. <strong>Lifecycle does not certify customer readiness.</strong></p><div class="drawer-links" style="margin-top:12px">'+ext(p.notionUrl,'Open canonical Notion record')+'</div></section>');
}
function repoDetail(n){
 const r=D.repositories.find(x=>x.name===n);if(!r)return;
 const products=r.links.length?r.links.map(x=>'<div class="small-p">'+escape(x.name)+' — '+escape(x.role)+'</div>').join(''):'<p class="small-p">No exact product mapping in this snapshot. It may be infrastructure, content, a legacy asset or still require triage.</p>';
 openDrawer('<span class="eyebrow">REPOSITORY / SOURCE REVIEW</span><h2 class="drawer-title">'+escape(r.name)+'</h2><p class="drawer-sub">GitHub repository and provisional portfolio role.</p><div class="drawer-badges">'+badge(r.kind)+badge(r.visibility)+badge(r.reviewDepth)+'</div><section class="drawer-block"><h4>Classification rationale</h4><p>'+escape(r.basis)+'</p></section><section class="drawer-block"><h4>Linked products</h4>'+products+'</section><section class="drawer-block"><h4>Historical context (July 2026)</h4><p>'+escape(r.historicalSummary||'No historical hand-classified summary found.')+'</p><p class="small-p" style="margin-top:8px">Historical status: '+escape(r.historicalStatus||'not listed')+'; previous family: '+escape(r.historicalLane||'not set')+'. Historical labels may have been superseded.</p></section><section class="drawer-block"><h4>GitHub record</h4><p class="small-p">Default branch: '+escape(r.defaultBranch||'not detected')+' · Size: '+escape(r.sizeKb==null?'unknown':r.sizeKb+' KB')+' · Archived in GitHub: '+(r.archived?'yes':'no')+'</p><div class="drawer-links" style="margin-top:12px">'+ext(r.url,'Open GitHub repository')+'</div></section>');
}
function download(name,content,type){
 const blob=new Blob([content],{type:type||'text/plain;charset=utf-8'}),u=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500);
}
function csvRow(values){return values.map(x=>'"'+String(x==null?'':x).replace(/"/g,'""').replace(/\r?\n/g,' ')+'"').join(',');}
function exportCsv(){
 const mode=state.view==='repositories'?'repositories':'products';
 if(mode==='repositories'){const rows=repoFilter(),cols=['Repository','Kind','Review depth','Visibility','Related products','URL','Historical status'];
 download('aerovista-repository-audit-2026-10-11.csv',[csvRow(cols),...rows.map(r=>csvRow([r.name,r.kind,r.reviewDepth,r.visibility,r.links.map(x=>x.name).join('; '),r.url,r.historicalStatus]))].join('\r\n'),'text/csv;charset=utf-8');}
 else{const rows=productFilter(),cols=['Product','Family','Lifecycle','Priority','Evidence tier','Last Reviewed','Repositories','NXCore Compose','Summary','Next Gate','Notion URL'];
 download('aerovista-products-2026-10-11.csv',[csvRow(cols),...rows.map(p=>csvRow([p.name,p.family,p.lifecycle,p.priority,p.evidenceTier,p.lastReviewed,p.repos.join('; '),(p.composeProjects||[]).join('; '),p.summary,p.nextGate,p.notionUrl]))].join('\r\n'),'text/csv;charset=utf-8');}
}
document.querySelector('.main-nav').addEventListener('click',e=>{const t=e.target.closest('[data-view]');if(t)nav(t.dataset.view);});
app.addEventListener('click',e=>{
 const p=e.target.closest('[data-product]');if(p)return productDetail(p.dataset.product);
 const r=e.target.closest('[data-repo]');if(r)return repoDetail(decodeURIComponent(r.dataset.repo));
 const ff=e.target.closest('[data-focus-family]');if(ff){state.family=ff.dataset.focusFamily;state.collection='All collections';return nav('products');}
 const j=e.target.closest('[data-jump]');if(j)return nav(j.dataset.jump);
 const n=e.target.closest('[data-page]');if(n){state.page=Math.max(1,Number(n.dataset.page));render();return;}
});
app.addEventListener('change',e=>{const f=e.target.closest('[data-filter]');if(f){state[f.dataset.filter]=f.value;state.page=1;render();}});
search.addEventListener('input',e=>{state.query=e.target.value;state.page=1;if(state.query&&(state.view==='overview'||state.view==='methodology'||state.view==='actions'||state.view==='overlaps'))nav('products');else render();});
document.getElementById('exportButton').addEventListener('click',exportCsv);
document.getElementById('printButton').addEventListener('click',()=>window.print());
document.getElementById('menuBtn').addEventListener('click',()=>{const sb=document.getElementById('sidebar');const expanded=sb.classList.toggle('open');document.getElementById('menuBtn').setAttribute('aria-expanded',String(expanded));});
document.getElementById('drawerClose').addEventListener('click',closeDrawer);
backdrop.addEventListener('click',closeDrawer);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();document.getElementById('sidebar').classList.remove('open');}if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();search.focus();}});
if(location.hash&&labels[location.hash.slice(1)])state.view=location.hash.slice(1);
render();
})();