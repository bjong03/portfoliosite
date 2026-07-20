function toggleMenu(){
    const menu = document.getElementById('mobileLinks');
    const btn = document.getElementById('menuToggle');
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function closeMenu(){
    document.getElementById('mobileLinks').classList.remove('open');
    document.getElementById('menuToggle').setAttribute('aria-expanded','false');
  }

  (function(){
    const row = document.getElementById('pedestalRow');
    const prevBtn = document.getElementById('timelinePrev');
    const nextBtn = document.getElementById('timelineNext');
    if(!row || !prevBtn || !nextBtn) return;

    let index = 0;

    function step(){
      const unit = row.querySelector('.pedestal-unit');
      const gap = parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap || 0);
      return unit ? unit.getBoundingClientRect().width + gap : 0;
    }

    function visibleCount(){
      const s = step();
      return s ? Math.max(1, Math.floor((row.parentElement.clientWidth + parseFloat(getComputedStyle(row).gap||0)) / s)) : 1;
    }

    function maxIndex(){
      const total = row.querySelectorAll('.pedestal-unit').length;
      return Math.max(0, total - visibleCount());
    }

    function update(){
      const max = maxIndex();
      if(index > max) index = max;
      if(index < 0) index = 0;
      row.style.transform = `translateX(${-index * step()}px)`;
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= max;
    }

    window.scrollTimeline = function(dir){
      index += dir;
      update();
    };

    window.addEventListener('resize', update);
    update();
  })();

  const PROJECTS = {
    ex01: {
      ticket:'EX-01', category:'Capstone', title:'Haven',
      role:'Product Manager & Software Developer', timeline:'Sep 2025 - Apr 2026', team:'2 Mechanical Engineers, 1 Electrical/Computer Engineer',
      skills:['Engineering Project Management','Product Strategy','Feature Prioritization','User Research','UI/UX Design','Hardware System Testing','React','FastAPI','SQLite','Docker','MQTT','Raspberry Pi 4','ESP32','RFID','Figma'],
      awards: ['Argosy Foundation VC Grant ($2000 USD)'],
      links:[
        {label:'Engineering Report', url:'https://drive.google.com/file/d/1bw5kBbUnshUirfodx3Mhc8-gNz3PR8e-/view?usp=sharing'},
        {label: "Poster", url: 'https://drive.google.com/file/d/1JAH2OTdtHuXqIyjURKjGgCbuZfL7vtOy/view?usp=sharing'}
      ],
      media:[
        {type:'embed', src:'https://drive.google.com/file/d/1JKAa2pRLLg5ju3PzHHLY6Y0tavtb8FOu/preview', caption:'Haven demo — tool dispense'},
        {type:'embed', src:'https://drive.google.com/file/d/1_gDuCNytxGZa6KlN6M9dPfg-RM9f4aUB/preview', caption:'Haven demo — tool return'}
      ],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'The Integrated Engineering Shop (IGEN Shop) is the only student-run makerspace at the University of British Columbia (UBC). The shop supports over 250 users and 30+ capstone projects each year, creating an environment where tools are frequently moved, misplaced, or stolen. While there are existing industry solutions, they are either prohibitively expensive, lack necessary security features, or fail to integrate seamlessly into makerspace environments. This reveals a gap: small shops need effective and affordable solutions for tool tracking and loss prevention.'},
            {type:'stats', items:[
              {value:'$3,000+', label:'Tool losses accumulated across two years'},
              {value:'$95K+', label:'Cost of the cheapest comparable commercial system'},
              {value:'250+', label:'Shop users sharing the same tool pool'},
              {value:'30+', label:'Capstone teams relying on tool availability'}
            ]},
            {type:'quote', text:'Our goal was simple: design an affordable smart tool vending machine for on-campus workshops that can dispense and track tools in real time, minimizing theft or loss.'}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'To understand user needs, 50+ IGEN Shop supervisors and frequent student workshop users were interviewed about existing workflows and pain points. Two personas emerged, each pulling the design in a different direction — and both had to be satisfied for the system to actually get used.'},
            {type:'cards', items:[
              {title:'Shop Supervisor — Operator', text:'A small student-worker team managing tool availability needs real-time visibility, instant theft alerts, and control over borrowing limits.', list:[
                'Admin dashboard with live inventory + usage analytics',
                'Automated overdue-tool alerts',
                'Remote manual override of dispensing hardware',
                'Must comply with UBC FIPPA data-privacy regulations'
              ]},
              {title:'Shop User — Student', text:'250+ students and capstone teams need to grab the right tool fast, trust that it will be there, and return it without extra steps.', list:[
                'Vending-machine-style UI, zero onboarding required',
                'Single-tool exposure per transaction, no rummaging',
                'RFID tap + mobile web flow, 30-second cycle',
                'Must not obstruct shop space or disrupt existing workflow'
              ]}
            ]}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'In the market, there are three main types of systems: self-serve lockers, electronically controlled toolboxes, and asset management software. Representative brands from each type of system were compared amongst each other to identify gaps:'},
            {type:'table', headers:['','Robocrib','kabTRAK','gigatrak'], rows:[
              ['Type of System','Self-Serve Locker','Electronically Controlled Toolbox','Asset Management Software'],
              ['Features',
                ['Rotating carousel','Touch screen display'],
                ['Custom sensor system','Tool audit reports'],
                ['Cloud hosted','Compatible with all device types']],
              ['Drawbacks',
                ['Not modular','No dispense mechanism','Extremely large'],
                ['No automated restocking','Users can access multiple tools at once','Sensor systems can be unreliable'],
                ['No physical components for tool safety','Proprietary system with little documentation','Difficult to customize for makerspace needs']],
              ['Cost','$95,000 CAD','$30,000 CAD','$3,500 CAD']
            ]},
            {type:'stats', items:[
              {value:'$3.3B → $5.8B', label:'Global industrial vending market, 2025 → 2030 est.'},
              {value:'~25,000', label:'Makerspace facilities in North America — addressable market'},
              {value:'96%', label:'Cheaper than the lowest-cost commercial alternative'}
            ]},
            {type:'p', text:'Existing commercial systems such as RoboCrib, kabTRAK, and GigaTrak demonstrated strong inventory management capabilities but were either prohibitively expensive, difficult to customize, or designed for industrial environments rather than university makerspaces. This provides an opportunity for Haven to provide comparable accountability at a fraction of the cost while integrating directly into existing workshop workflows.'}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'Haven integrates a rotary storage "tool cake," a vertical Cartesian XY delivery gantry, and a centralized Raspberry Pi control stack into one self-serve kiosk — authenticating users, exposing exactly one tool at a time, and logging every transaction automatically.'},
            {type:'media', items:[
              {type:'diagram', src:'images/media/ex01/haven-full-assembly.png', caption:'Haven Full Assembly'}
            ]},
            {type:'cards', items:[
              {title:'Mechanical — Storage & Delivery', text:'A stationary rotary "cake" (6 layers × 5 tools = 30 tools) indexes tools to an open transfer sector, where a vertical Cartesian XY gantry picks up and delivers to the user bay.', list:[
                'Self-locking lead screws avoid continuous motor holding torque under load',
                'Aluminum extrusion frame + polycarbonate panels for rigidity and visibility',
                'Gantry supports ~3.5kg vs. 0.73kg design load'
              ]},
              {title:'Electrical — Centralized Control', text:'Migrated from a distributed per-module PCB architecture to a centralized Raspberry Pi 4 system, improving reliability and motor synchronization.', list:[
                'Klipper firmware for deterministic multi-axis motion control',
                'AS5600 magnetic encoders via custom I2C mux PCB',
                'RC522 RFID authentication'
              ]},
              {title:'Software — Web App & Admin Console', text:'A Dockerized React/FastAPI stack drives both the student-facing mobile web app and an admin console with live inventory and camera monitoring.', list:[
                'RFID tap → QR-linked mobile web flow, no app install required',
                'Admin dashboard: user/tool management, overdue alerts, usage analytics',
                'CI/CD via self-hosted GitHub Actions runner + Tailscale'
              ]}
            ]},
            {type:'p', text:'Core user flow — tool dispense, RFID to retrieval:'},
            {type:'cards', items:[
              {title:'1 — Scan RFID card', text:'User taps their card at the kiosk to authenticate.'},
              {title:'2 — Select tool on mobile web', text:'A QR-linked mobile page lists available tools.'},
              {title:'3 — Gantry + rotary layer index', text:'The storage cake rotates and the gantry positions itself.'},
              {title:'4 — Tool delivered to user bay', text:'The gantry exposes exactly one tool for pickup.'},
              {title:'5 — Retrieval verified & logged', text:'The transaction is confirmed and logged automatically.'}
            ]}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'The prototype underwent 152 integrated dispense-and-return cycles across multiple tool geometries and storage levels, achieving 93% overall reliability. Of the 10 total failures, 9 occurred during return rather than dispense — isolating the transfer/reinsertion interface as the primary area for further refinement, not the overall architecture.'},
            {type:'table', headers:['Test Category','Result'], rows:[
              ['Moderate tools (≤20cm)','96% success'],
              ['Long/heavy tools (~23cm)','87% success'],
              ['Overall system','93% success'],
              ['Software test flows','11 / 14 flows passing']
            ]},
            {type:'stats', items:[
              {value:'30s', label:'Website request → tool at user bay'},
              {value:'3.5kg', label:'Gantry payload demonstrated (vs. 0.73kg design)'},
              {value:'$294', label:'Under the $3,706 worst-case budget'},
              {value:'$2,000', label:'Argosy Foundation funding secured via pitch'}
            ]},
            {type:'table', headers:['Specification','Target','Result'], rows:[
              ['Footprint','≤ 2\' wide, ≤ 3\' long','Within required footprint'],
              ['Storage capacity','≥ 30 tools','6 layers × 5 tools = 30 tools'],
              ['Dispense cycle time','≤ 30s','30s measured end-to-end'],
              ['Gantry payload','Handle 0.73kg','Supports ~3.5kg — exceeded'],
              ['Tool geometry range','Varying handheld tools','96% moderate / 87% longest category']
            ], highlightRow:3}
          ]
        }
      ]
    },
    ex02: {
      ticket:'EX-02', category:'Capstone', title:'TRASH-E',
      role:'Product Manager & Software Developer', timeline:'Sep 2023 - May 2024', team:'2 Mechanical Engineers, 1 Electrical Engineer, 1 Computer Engineer',
      skills:['User Interviews','Needs Assessment','MVP Scoping','Weighted Decision Matrices','Validation & Verification','Socio-Economic Impact Assessment','Budget Ownership','Stakeholder Pitching','ArduPilot','Mission Planner','GPS Waypoint Navigation','Python / Flask','Intel RealSense D455','Raspberry Pi 5','HTTP / UDP Streaming'],
      awards:['1st Place Sustainability Category @ CSME 2025 National Design Competition', 'Runner-Up Collegiate Prototype @ 2024 Canada Tech Futures Challenge', 'Biggest Pivot Since Pitch @ 2024 Canada Tech Futures Challenge'],
      links:[
        {label:'Engineering Report', url:'https://docs.google.com/document/d/1Iuzk2diPuAMpJUD0vQ7LzsTqhW6wU8BtM5if2e2bgEI/edit?usp=sharing'},
        {label: 'CSME Award Announcement', url: 'https://www.linkedin.com/posts/brandon-jong_csme2025-designcompetition-engineeringinnovation-activity-7337871602350440449-iKLY?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAjd_LgB6T3NDtfy-5hveYPjeFZ6uLK7pvM'},
        {label: 'Tech Futures Challenge Award Announcement', url: 'https://www.linkedin.com/posts/brandon-jong_with-transformer-partners-like-cenovus-energy-activity-7204859713853804544-dM8J?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAjd_LgB6T3NDtfy-5hveYPjeFZ6uLK7pvM'}
      ],
      media:[],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Cleanup products overwhelmingly skim surface debris — but research across 23 countries shows plastic density is highest in small waterways, and most of it settles on the lakebed. Today the only way it comes out is by volunteer scuba divers searching blindly by hand, exposed to decompression sickness, hypothermia, and drowning risk with every extra minute underwater.'},
            {type:'stats', items:[
              {value:'1M+', label:'Seabirds and marine animals killed by plastic pollution each year'},
              {value:'27,000 kg', label:'Trash pulled from BC waterways by our partner divers (DCLO) since 2013 — all by hand'},
              {value:'~160 min', label:'A typical dive expedition, much of it wasted searching instead of collecting'}
            ]}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'Our primary user was Henry Wang, founder of Divers for Cleaner Lakes and Oceans. A 1.5-hour discovery interview, continuous validation loops, and real dive footage were synthesized into 9 requirements and 15 measurable specifications — every design decision traceable back to a user need.'},
            {type:'cards', items:[
              {title:'Insight 1 — Safe time underwater is the scarcest resource', text:'Searching for trash burns most of a dive. → Move the search above the surface with a live underwater camera feed.'},
              {title:'Insight 2 — Hauling to shore breaks the workflow', text:'Divers carry loads back mid-dive. → A winch-lowered mesh basket lets divers deposit trash on the spot.'},
              {title:'Insight 3 — Users are non-technical volunteers', text:'MindFuel mentorship reinforced it. → Shore-side assistant runs missions from a simple map-and-video interface.'}
            ]}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'We benchmarked TRASH-E against the realistic alternatives a volunteer dive organization actually has access to today:'},
            {type:'table', headers:['Alternative','Where it falls short'], rows:[
              ['Manual volunteer diving (status quo)', 'Dangerous and slow. Divers search blindly and are limited to what one person can carry.'],
              ['Surface skimmers', 'Only touch floating debris. Mr. Trash Wheel–style collectors miss the majority of waste on the lakebed.'],
              ['Commercial ROVs', 'Expensive and underpowered. ~$240 USD per thruster alone; built for inspection, not bulk trash hauling.'],
              ['Trolling-motor craft', 'Cost-prohibitive, no recovery capability. $200+ CAD per motor with no answer for sunken trash.']
            ]},
            {type:'p', text:'TRASH-E owns an underserved niche: sub-surface trash recovery as a diver-assist tool, built for volunteer-organization budgets. At ~$1,535 in prototype cost, it undercuts commercial ROV platforms by an order of magnitude while doing a job no incumbent performs.'}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'A 4′×4′, ~50 lb semi-autonomous pontoon craft that separates finding and hauling from the diver\'s job — a winch lowers a weighted mesh basket to depths of 10 m.'},
            {type:'p', text:'User workflow across a mission:'},
            {type:'cards', items:[
              {title:'1. Survey the lakebed', text:'User scans via live underwater camera feed — before anyone enters the water.'},
              {title:'2. Drop waypoints', text:'Trash sightings become GPS waypoints on a mission map.'},
              {title:'3. Autonomous escort', text:'TRASH-E navigates waypoint to waypoint; the diver deposits trash in the lowered basket.'},
              {title:'4. Return & unload', text:'Craft autonomously hauls the full load back to shore.'}
            ]},
            {type:'p', text:'Key engineering and product decisions along the way:'},
            {type:'cards', items:[
              {title:'Scoping call — Semi-autonomy first', text:'Full autonomy was infeasible in our timeframe — so we automated the highest-risk, highest-time-cost parts of the workflow (search and hauling) first.'},
              {title:'Build vs. adopt — Pivot to ArduPilot', text:'Our custom Arduino GPS/compass navigation hit only ±20 m accuracy. A weighted decision matrix drove a pivot to open-source ArduPilot + Mission Planner — reliable waypoint navigation without rebuilding it ourselves.'},
              {title:'Cost engineering — Scooter motors, not thrusters', text:'Commercial options were too expensive or too weak — we adapted 24V scooter motors with a custom belt-driven propeller assembly.'},
              {title:'Iteration — Redesign for real users', text:'After buoyancy and transport failures, a redesign to a 4′×4′ plywood platform halved platform weight and made the craft carryable by 1–2 people in four modules.'}
            ]}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'Across 15 specifications and 6 test campaigns: 8 passed outright (buoyant with 20+ lb loads, ~5 h runtime, 720p video streaming, GPS waypoint mapping, eco-safe materials, 3D-printable spares), 4 were a conditional pass pending longer-term verification (100 m telemetry range, corrosion resistance, packet throughput, material durability), and 3 were deferred to the DCLO field pilot due to shallow test-site conditions.'},
            {type:'stats', items:[
              {value:'−50%', label:'Estimated reduction in diver time underwater'},
              {value:'2,500 lbs', label:'Additional trash removable from BC waterways per year'},
              {value:'2×', label:'Battery life vs. a typical cleanup operation'},
              {value:'$931', label:'Delivered under our $2,466 budget'}
            ]},
            {type:'quote', text:'Strongest signal of product–user fit: after seeing the prototype and test footage, Henry Wang invited the team to deploy TRASH-E on a real multi-day cleanup expedition on the Sunshine Coast — from prototype to committed pilot with the target user.'}
          ]
        }
      ]
    },
    ex03: {
      ticket:'EX-03', category:'Personal Project', title:'SentryFlame',
      role:'Product Manager & Software Developer', timeline:'Jun 2025 - Jul 2025', team:'1 Business Analyst',
      skills:['Bentley iTwin','React','TypeScript','API Design & Integration','IoT Sensor Integration','UI/UX Design','Agentic AI','Market & Regulatory Research','Business Modeling'],
      awards:['3rd Place @ 2025 Enactus Canada x Bentley iTwin4Good National Competition'],
      links:[
        {label: 'Pitch Deck', url: 'https://pitch.com/v/sentryflame-pztj3a'},
        {label:'Enactus Award Announcement', url: 'https://www.linkedin.com/posts/announcing-the-top-three-teams-from-the-canadian-share-7356737953924046848-H1FL/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAjd_LgB6T3NDtfy-5hveYPjeFZ6uLK7pvM'}
      ],
      media:[{type:'embed', src:'https://www.youtube.com/embed/erl88wfBXnc', caption:'SentryFlame Demo Video'}],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Firefighters responding to structure fires typically work with outdated tools — printed 2D floorplans or, at best, static 3D layouts on tablets — with no real-time hazard data and no visibility into where occupants are inside the building. Fire alarm panels show which zone triggered an alarm but nothing about live conditions, and there is minimal data sharing across Fire, EMS, and Police. This lack of situational awareness costs time locating victims, leads to poorer tactical decisions, and increases risk to both residents and first responders.'},
            {type:'stats', items:[
              {value:'80%', label:'of structure fires happen in residential buildings'},
              {value:'92%', label:'of injuries in this category occur in those buildings'},
              {value:'84%', label:'of deaths in this category occur in those buildings'}
            ]},
            {type:'p', text:'Fire intensity also grows non-linearly: a fire is still manageable at 3–4 minutes, but by the 9-minute mark — close to the typical 7–8 minute emergency response window — one additional minute can turn catastrophic. Every minute saved in situational awareness and response time directly reduces damage, injury, and loss of life.'},
            {type:'stats', items:[
              {value:'3–4 min', label:'Fire still manageable'},
              {value:'7–8 min', label:'Typical response window'},
              {value:'9 min', label:'One more minute can turn fatal'}
            ]},
            {type:'p', text:'This is also a well-funded, receptive market: $7.4M is available provincially for modern firefighting equipment, with roughly $250M available nationwide for fire-modernization funding in Canada — meaning the barrier to adoption isn\'t budget, it\'s the availability of a credible modern tool.'}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'The team conducted direct consultations with two fire departments — Vancouver Fire Department (VFD) and Toronto Fire Department (TFD) — to validate current-state pain points before building. Key findings from these conversations:'},
            {type:'cards', items:[
              {title:'Static, outdated floorplans', text:'Most crews rely on PDF floorplans or, at best, basic 3D layouts on tablets — nothing dynamic or real-time.'},
              {title:'Zone-level alerts only', text:'Fire alarm panels only communicate zone-level alerts, not precise or evolving hazard locations.'},
              {title:'No live hazard tracking', text:'There is no live hazard tracking once a fire starts, so crews\' mental models go stale the moment they\'re wrong.'},
              {title:'No cross-agency data sharing', text:'There is little to no cross-agency data sharing between Fire, EMS, and Police, creating coordination gaps at the exact moment coordination matters most.'}
            ]},
            {type:'p', text:'These insights directly shaped the intervention: rather than another static pre-incident plan viewer, SentryFlame needed to deliver live, sensor-driven building state, with a design built around the specific decisions firefighters make in the first minutes on scene — where\'s the fire, who\'s trapped, which exits are blocked, who needs help first.'},
            {type:'p', text:'Beyond the primary Fire/EMS/Police user group, the team identified adjacent stakeholders whose needs shaped the business model and go-to-market: commercial real estate owners, industrial facility managers, insurance companies, and property managers seeking risk reduction and operational continuity — all groups with dedicated safety/emergency-preparedness budgets.'}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'SentryFlame was benchmarked against players across three adjacent categories — early detection, smart-building management, and monitored suppression — plus the fire-panel installers that represent the entrenched status quo.'},
            {type:'table', headers:['Competitor','Category','Setup Cost','Ongoing Cost','Key Gap'], highlightRow:5, rows:[
              ['Honeywell','Early detection / compliance checks','$12K–$30K','~$2K/yr','No live floorplans, no occupant alerts, no AI-guided evacuation routing'],
              ['Siemens Desigo CC','Smart building management','~$70K–$100K (excl. install)','$5K–$15K/yr','Building-management tool, not visualization-first; only a sensor list + map pins, no live floorplans, no AI routing'],
              ['Fire Rover','24/7 monitored suppression','~$200K','~$32K/yr','Requires constant human monitoring; very high labor cost'],
              ['Mappedin','Mapping SaaS','—','Up to $165/map/month','Mapping only, no live sensor/hazard integration'],
              ['Honeywell Fire Lite (via installer)','Legacy fire panel','$2K panel + $6K–$30K install','—','Pinpoints only which room, no live sensors, no maps, and often needs incompatible-sensor replacement'],
              ['SentryFlame','Live digital twin + AI evacuation','$1K–$3K hardware','$3.6K–$14.4K/yr','—']
            ]},
            {type:'p', text:'Every incumbent solves one slice of the problem — detection, building management, or suppression monitoring — but none combine a live, occupant-aware 3D digital twin with AI-driven evacuation guidance at a price point accessible to individual departments and buildings. SentryFlame\'s retrofit path (under $5 per legacy sensor converted) also removes the biggest adoption blocker competitors ignore: most buildings already have non-compatible smoke detectors, and full sensor replacement is often the most expensive line item in a competitor\'s quote.'},
            {type:'p', text:'The public safety tech market is projected to reach $36.5B by 2030. In Canada alone, ~$250M in fire-modernization funding is earmarked, and the team has an early relationship with UBC through Third Quadrant as a potential pilot/validation partner.'}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'SentryFlame is a live digital twin for structure fires, built on Bentley\'s iTwin platform, that gives first responders real-time situational awareness before and during entry.'},
            {type:'cards', items:[
              {title:'Live 3D digital twin', text:'Real-time building layouts with tactical overlays, viewable en route or on scene, built from Bentley iTwin + a custom React/TypeScript viewer.'},
              {title:'Sensor-driven alerts', text:'Smoke detectors and CCTV feeds populate three alert types on the live floorplan — fire detected, blocked exit, and lost device signal.'},
              {title:'Digital emergency fire plan', text:'A side panel with active Alerts, a live occupant Directory flagging high-risk residents, and consolidated Emergency Contacts.'},
              {title:'SentryPal, AI companion', text:'Summarizes active alerts and generates an optimized evacuation plan that prioritizes occupants with medical conditions and routes around blocked exits.'},
              {title:'Low-cost retrofit path', text:'Converts existing legacy smoke detectors to be IoT-compatible for under $5/device, removing the main integration barrier competitors face.'},
              {title:'Dual-use design', text:'Beyond live emergencies, the same platform doubles as a training/simulation tool so crews can build tactical familiarity before they\'re ever dispatched.'}
            ]},
            {type:'p', text:'Business model: a hybrid hardware + SaaS approach. A one-time hardware install ($1K–$3K per site) plus a tiered monthly/annual subscription starting at $300/mo, with bundled pricing available for city-wide multi-building deployments.'}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'stats', items:[
              {value:'$210M', label:'Property damage avoided annually'},
              {value:'101', label:'Lives impacted per year'},
              {value:'$90M', label:'Medical + insurance cost savings'},
              {value:'10–20×', label:'Projected customer ROI per site'},
              {value:'$100K+', label:'Annual savings per site'}
            ]},
            {type:'list', items:[
              'De-risked adoption path: compatible with any existing smoke detector configuration via a sub-$5 retrofit, removing the largest cost/integration barrier seen in competitor deployments',
              'Validated demand: direct engagement with VFD and TFD confirmed the core pain points, alongside $7.4M in provincial and ~$250M in national Canadian funding earmarked for this kind of modernization',
              'Planned rollout: Q4 2025 finalize IoT hardware + agentic AI → Q1 2026 launch fire-code compliance tools → Q2 2026 pilot with Vancouver Fire Department → Q3 2026 begin full customer onboarding',
              'Supports SDG 3 (Good Health & Well-being), SDG 8 (Decent Work & Economic Growth), SDG 9 (Industry & Innovation), and SDG 11 (Sustainable Cities & Communities)'
            ]}
          ]
        }
      ]
    },
    ex04: {
      ticket:'EX-04', category:'Capstone', title:'Heat Stroke Prevention Vest',
      role:'Product Manager & Hardware Engineer', timeline:'Oct 2022 - Apr 2023', team:'2 Mechanical Engineers, 1 Materials Engineer, 2 Computer Engineers',
      skills:['Arduino Uno (C/C++)','Sensor Integration','Circuit Design','CAD Modeling','3D Printing','Material Selection','Thermodynamics','Rule-Based Algorithm Design','Human-Subject Trials','IP-Rating Waterproof Testing','Survey Design & Analysis','Field Validation'],
      awards:[],
      links:[
        {label:'Engineering Report', url:'https://drive.google.com/file/d/1LU_JkUHvjhoemdLvZcn8KXMX5s377_7S/view?usp=sharing'},
        {label: "Poster", url: 'https://drive.google.com/file/d/15BEqtnWq2fU8VXHSMZz_pZJSxKUxUTA3/view?usp=sharing'}
      ],
      media:[
        {type:'embed', src:'https://www.youtube.com/embed/4svBX57A8I4', caption:'Heat Stroke Prevention Vest — Demo'}
      ],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Rising global temperatures are putting more people at risk of heat stroke, more often — often in places where help can\'t reach them in time. Heat stroke is fast, common, and easy to miss until it becomes a medical emergency.'},
            {type:'cards', items:[
              {title:'365,000 deaths / year', text:'Deaths per year linked to extreme heat exposure worldwide — a number expected to climb as heat waves become more frequent.'},
              {title:'Symptoms hide in plain sight', text:'Most people can\'t tell the difference between "just hot and tired" and the actual onset of a medical emergency.'},
              {title:'Help rarely arrives in time', text:'Trails, job sites, and backcountry are exactly where heat stroke strikes most — and where emergency response is slowest.'}
            ]}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'Before building anything, the team identified two overlapping causes of heat stroke — exertional and non-exertional — and mapped which real-world groups face each one, to make sure the design targeted an actual, specific need.'},
            {type:'cards', items:[
              {title:'Exertional risk', text:'Strenuous physical activity in hot environments — the primary risk group for athletes and physical labor.', list:['Outdoor & industrial workers','Firefighters','Construction & farm workers','Hikers & backpackers','Athletes']},
              {title:'Non-exertional risk', text:'Prolonged exposure to hot, humid conditions alone — often harder to self-detect since no exercise is involved.', list:['Elderly (65+)','Infants & children','Cardiovascular / respiratory conditions','Those on heat-sensitive medications']}
            ]},
            {type:'quote', text:'Where the idea came from: the project\'s motivation wasn\'t purely academic — a team member personally experienced heat stroke, which, combined with research showing 365,000 heat-related deaths a year, confirmed this was a real, felt problem worth solving before any prototyping began.'}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'The personal cooling vest market splits into four established categories — each requires the wearer to manually activate or recharge it:'},
            {type:'table', headers:['Category','Strength','Weakness'], rows:[
              ['Ice-pack', 'Strongest immediate chill', 'Needs a freezer, heavy, short duration'],
              ['Phase-change (PCM)', 'Steady, non-harsh cooling', 'Bulky, 2–4 hr duration, needs cold water to recharge'],
              ['Evaporative', 'Lightweight, cheap, simple', 'Humidity-dependent, no automation'],
              ['Battery / circulatory', 'Strongest sustained performance', 'Heaviest and most expensive']
            ]},
            {type:'quote', text:'The gap: no competitor product combines multiple cooling mechanisms with automatic, sensor-driven activation. This vest layers evaporative + fan + water-dripping cooling and scales itself as predicted risk rises — at a prototype cost (~$230) competitive with premium PCM and circulatory vests, but with predictive intelligence none of them have.'}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'Sensors feed a risk-scoring algorithm; the algorithm decides how hard the vest should cool — no input needed from the wearer. As predicted risk climbs from No Risk through Low, Medium, and High to Emergency, the vest escalates its response automatically.'},
            {type:'cards', items:[
              {title:'Sense', text:'A DHT11 sensor reads ambient temperature & humidity; two LM35 sensors (armpit + neck) track core body temperature.'},
              {title:'Predict', text:'An onboard algorithm — built from NWS & Mayo Clinic thresholds — scores heat index and body temperature into one risk level.'},
              {title:'Respond', text:'Servo-driven valves and fan controls escalate cooling automatically — fully mechanical, no app or button press required.'}
            ]},
            {type:'p', text:'Three cooling mechanisms scale with that response:'},
            {type:'cards', items:[
              {title:'Fan cooling', text:'Low → high airflow speed, ramped automatically as risk increases.'},
              {title:'Evaporative layer', text:'PVA fabric wicks & cools as air moves across it.'},
              {title:'Water dripping', text:'Servo-driven valves re-wet the fabric to sustain evaporative cooling.'}
            ]}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'Verified in a controlled trial: 20 minutes of treadmill exertion, then 20 minutes of active cooling at high fan speed with water dripping engaged.'},
            {type:'stats', items:[
              {value:'−3.8°C', label:'Core temp. drop in 20 min (±0.45°C)'},
              {value:'616 kJ', label:'Max. energy removed'},
              {value:'8 hrs', label:'Runtime on 2 power banks'},
              {value:'~$230', label:'Prototype build cost'}
            ]},
            {type:'list', items:[
              '✓ Waterproof — withstood 10 min of continuous oscillating spray',
              '✓ Coverage — 0.38 m² body surface area (target: 0.35–0.42 m²)',
              '✓ Weight — 2.85 lb dry / 6.12 lb wet (target: ≤15 lb)',
              '✓ Runtime — 8 hours on 2 power banks (target met)',
              '✓ Auto-activation — triggers at target body-temp / heat-index thresholds',
              '~ Sensor accuracy — couldn\'t be independently confirmed with available equipment'
            ]},
            {type:'p', text:'Validating it with real people: once the prototype worked, the team took it to UBC\'s Design & Innovation Day to confirm it held up outside the lab.'},
            {type:'cards', items:[
              {title:'Method 01 — Live product demo', text:'Ran a public booth at the showcase, letting attendees see, try on, and react to the working prototype in person.'},
              {title:'Method 02 — Likert-scale usability survey', text:'4-question, 1–10 scale survey covering assembly, comfort, aesthetics, and everyday usability — completed by booth visitors and peer testers.'},
              {title:'Method 03 — Hands-on wear test', text:'Peers physically assembled and wore the vest unassisted, testing the "no additional help required" requirement directly.'}
            ]},
            {type:'stats', items:[
              {value:'11', label:'Participants surveyed'},
              {value:'1', label:'Public showcase event'},
              {value:'4', label:'Dimensions measured'},
              {value:'1–10', label:'Likert rating scale'}
            ]},
            {type:'stats', items:[
              {value:'6.67/10', label:'Comfort'},
              {value:'6.00/10', label:'Visual aesthetics'},
              {value:'5.45/10', label:'Accessibility / usability'},
              {value:'3.81/10', label:'Ease of assembly'}
            ]},
            {type:'p', text:'Self-reported ratings, n=11. Lower scores flag friction points, not failure — they directly shaped the roadmap below.'},
            {type:'quote', text:'Interest in buying a cooling vest came up unprompted, multiple times — a strong signal this wasn\'t a hypothetical need. One attendee described a close call with heat exhaustion while motorbiking, echoing a similar experience one of our own team members had. Testers consistently said they\'d reach for this vest for a specific, high-stakes moment — a strenuous hike or a hot outdoor shift — rather than as daily wear. That reframed how we thought about the target use case going forward.'},
            {type:'table', headers:['Finding','Resulting decision'], rows:[
              ['Usability/accessibility scored lowest (5.45/10); testers cited visible wiring and bulk', 'Prioritized reducing wire visibility and vest bulk as the top item in future work'],
              ['Users said they\'d only wear it for high-stakes activity, not daily use', 'Narrowed initial target use case to occasional, high-intensity scenarios (hiking, hot outdoor shifts) instead of everyday wear'],
              ['Assembly was rated as manageable without instructions, despite the lowest raw score', 'Confirmed the "no additional assistance to wear" requirement was met; deprioritized building a formal instruction manual'],
              ['Unprompted purchase interest and real anecdotes of near heat-exhaustion incidents', 'Validated genuine market pull, supporting further investment past the prototype stage']
            ]},
            {type:'p', text:'Limitations: single-location convenience sample (n=11) at one showcase event; self-reported ratings rather than task-based usability metrics. A production-stage study would expand sample size and add moderated task testing.'}
          ]
        }
      ]
    }
  };

  function buildMediaGrid(items){
    if(!items || !items.length) return null;
    const grid = document.createElement('div');
    grid.className = 'media-grid';
    items.forEach(function(item){
      const figure = document.createElement('figure');
      figure.className = 'media-item ' + item.type;

      let frame;
      if(item.type === 'video'){
        frame = document.createElement('video');
        frame.src = item.src;
        if(item.poster) frame.poster = item.poster;
        frame.controls = true;
      } else if(item.type === 'embed'){
        frame = document.createElement('iframe');
        frame.src = item.src;
        frame.allow = 'autoplay; fullscreen';
        frame.allowFullscreen = true;
      } else {
        frame = document.createElement('img');
        frame.src = item.src;
        frame.loading = 'lazy';
        frame.alt = item.caption || '';
      }
      frame.className = 'media-frame';
      figure.appendChild(frame);

      if(item.caption){
        const caption = document.createElement('figcaption');
        caption.textContent = item.caption;
        figure.appendChild(caption);
      }

      grid.appendChild(figure);
    });
    return grid;
  }

  function buildTable(table){
    const wrap = document.createElement('div');
    wrap.className = 'case-table-wrap';
    const el = document.createElement('table');
    el.className = 'case-table';

    if(table.headers && table.headers.length){
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      table.headers.forEach(function(h){
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      el.appendChild(thead);
    }

    const tbody = document.createElement('tbody');
    table.rows.forEach(function(row, rowIndex){
      const tr = document.createElement('tr');
      if(table.highlightRow === rowIndex) tr.className = 'highlight';
      row.forEach(function(cell){
        const td = document.createElement('td');
        if(Array.isArray(cell)){
          const ul = document.createElement('ul');
          cell.forEach(function(li){
            const liEl = document.createElement('li');
            liEl.textContent = li;
            ul.appendChild(liEl);
          });
          td.appendChild(ul);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    el.appendChild(tbody);
    wrap.appendChild(el);
    return wrap;
  }

  function buildSection(section){
    if(!section.blocks || !section.blocks.length) return null;
    const wrap = document.createElement('div');
    wrap.className = 'case-section';
    const h4 = document.createElement('h4');
    h4.textContent = section.title;
    wrap.appendChild(h4);

    section.blocks.forEach(function(block){
      if(block.type === 'p'){
        const p = document.createElement('p');
        p.textContent = block.text;
        wrap.appendChild(p);
      } else if(block.type === 'quote'){
        const q = document.createElement('blockquote');
        q.className = 'case-quote';
        q.textContent = block.text;
        wrap.appendChild(q);
      } else if(block.type === 'list'){
        const ul = document.createElement('ul');
        ul.className = 'case-list';
        block.items.forEach(function(item){
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      } else if(block.type === 'table'){
        wrap.appendChild(buildTable(block));
      } else if(block.type === 'stats'){
        const grid = document.createElement('div');
        grid.className = 'case-stats';
        block.items.forEach(function(stat){
          const tile = document.createElement('div');
          tile.className = 'case-stat';
          const num = document.createElement('div');
          num.className = 'num';
          num.textContent = stat.value;
          const label = document.createElement('div');
          label.className = 'label';
          label.textContent = stat.label;
          tile.appendChild(num);
          tile.appendChild(label);
          grid.appendChild(tile);
        });
        wrap.appendChild(grid);
      } else if(block.type === 'cards'){
        const grid = document.createElement('div');
        grid.className = 'case-cards';
        block.items.forEach(function(card){
          const el = document.createElement('div');
          el.className = 'case-card';
          const h5 = document.createElement('h5');
          h5.textContent = card.title;
          el.appendChild(h5);
          if(card.text){
            const p = document.createElement('p');
            p.textContent = card.text;
            el.appendChild(p);
          }
          if(card.list && card.list.length){
            const ul = document.createElement('ul');
            ul.className = 'case-list card-list';
            card.list.forEach(function(item){
              const li = document.createElement('li');
              li.textContent = item;
              ul.appendChild(li);
            });
            el.appendChild(ul);
          }
          grid.appendChild(el);
        });
        wrap.appendChild(grid);
      } else if(block.type === 'media'){
        const grid = buildMediaGrid(block.items);
        if(grid){
          grid.classList.add('section-media');
          wrap.appendChild(grid);
        }
      }
    });

    return wrap;
  }

  function openCase(id){
    const p = PROJECTS[id];
    if(!p) return;

    document.getElementById('caseTag').textContent = p.ticket + ' — ' + p.category;
    document.getElementById('caseTitle').textContent = p.title;
    document.getElementById('caseRole').textContent = p.role;
    document.getElementById('caseTimeline').textContent = p.timeline;
    document.getElementById('caseTeam').textContent = p.team;

    const skillsEl = document.getElementById('caseSkills');
    skillsEl.innerHTML = '';
    p.skills.forEach(function(skill){
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = skill;
      skillsEl.appendChild(chip);
    });

    const awardWrap = document.getElementById('caseAwardWrap');
    const awardListEl = document.getElementById('caseAward');
    awardListEl.innerHTML = '';
    if(p.awards && p.awards.length){
      p.awards.forEach(function(award){
        const line = document.createElement('div');
        line.className = 'award-line';
        line.textContent = award;
        awardListEl.appendChild(line);
      });
      awardWrap.style.display = '';
    } else {
      awardWrap.style.display = 'none';
    }

    const linksWrap = document.getElementById('caseLinksWrap');
    const linksEl = document.getElementById('caseLinks');
    linksEl.innerHTML = '';
    if(p.links && p.links.length){
      p.links.forEach(function(link){
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.label;
        a.target = '_blank';
        a.rel = 'noopener';
        linksEl.appendChild(a);
      });
      linksWrap.style.display = '';
    } else {
      linksWrap.style.display = 'none';
    }

    const mediaEl = document.getElementById('caseMedia');
    mediaEl.innerHTML = '';
    const topGrid = buildMediaGrid(p.media);
    if(topGrid){
      mediaEl.appendChild(topGrid);
      mediaEl.style.display = '';
    } else {
      mediaEl.style.display = 'none';
    }

    const bodyEl = document.getElementById('caseBody');
    bodyEl.innerHTML = '';
    (p.sections || []).forEach(function(section){
      const sectionEl = buildSection(section);
      if(sectionEl) bodyEl.appendChild(sectionEl);
    });

    document.getElementById('overlay').classList.add('open');
  }
  function closeCase(){ document.getElementById('overlay').classList.remove('open'); }
  document.getElementById('overlay').addEventListener('click', function(e){ if(e.target === this) closeCase(); });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    let lastLeaf = 0;
    const leafSVG = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M14 3c6 2 9 7 9 12-4 1-9-1-11-5-1 3 0 7 3 9-5 1-10-3-10-9 0-4 3-6 9-7z" fill="${color}" stroke="#241D14" stroke-width="1"/></svg>`;
    const leafColors = ['#C9A155','#F2DFA6','#4FA8A0','#D98BB0'];
    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if(now - lastLeaf < 90) return;
      lastLeaf = now;
      const el = document.createElement('div');
      el.className = 'leaf-particle';
      el.innerHTML = leafSVG(leafColors[Math.floor(Math.random()*leafColors.length)]);
      el.style.left = (e.clientX - 8) + 'px';
      el.style.top = (e.clientY - 8) + 'px';
      document.body.appendChild(el);
      const drift = (Math.random() - 0.5) * 60;
      const rot = (Math.random() - 0.5) * 260;
      const duration = 900 + Math.random()*400;
      el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity:1 },
        { transform: `translate(${drift}px, 70px) rotate(${rot}deg)`, opacity:0 }
      ], { duration: duration, easing:'ease-out' });
      setTimeout(() => el.remove(), duration);
    });
  }
