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
        {label: "Poster", url: 'https://drive.google.com/file/d/1JAH2OTdtHuXqIyjURKjGgCbuZfL7vtOy/view?usp=sharing'},
        {label: "Investor Pitch Deck", url: 'https://docs.google.com/presentation/d/1Ehs4-i5L39Vwi-Y2JFZQfBSqd0x6qEbsISlhz6fGrtM/edit?usp=sharing'}
      ],
      media:[
        {type:'embed', src:'https://www.youtube.com/embed/PBo5XtxgocQ', caption:'Haven Demo Video'}
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
        {label: 'Poster', url: 'https://drive.google.com/file/d/1_0cx4J_uG_fQZ1mQORJRDQEGIZwFU2nY/view?usp=sharing'},
        {label: 'CSME Award Announcement', url: 'https://www.linkedin.com/posts/brandon-jong_csme2025-designcompetition-engineeringinnovation-activity-7337871602350440449-iKLY?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAjd_LgB6T3NDtfy-5hveYPjeFZ6uLK7pvM'},
        {label: 'Tech Futures Challenge Award Announcement', url: 'https://www.linkedin.com/posts/brandon-jong_with-transformer-partners-like-cenovus-energy-activity-7204859713853804544-dM8J?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAjd_LgB6T3NDtfy-5hveYPjeFZ6uLK7pvM'}
      ],
      media:[
        {type:'embed', src:'https://www.youtube.com/embed/w7LKWOTTCcA', caption:'TRASH-E Prototype Video'}
      ],
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
    },
    ex05: {
      ticket:'EX-05', category:'Hackathon', title:'Capital Class',
      role:'Product Manager & Full-Stack Developer', timeline:'Sep 2026 — HackMIT', team:'2 Developers',
      skills:['Product Strategy','Market & Competitive Analysis','Gamification Design','EdTech / Financial Literacy','AI Guardrail Design','Voice UX','Next.js','React','TypeScript','TailwindCSS','Recharts','Supabase','SQLite (libSQL)','OpenAI API','Deepgram STT/TTS','Role-Based Auth'],
      awards:[],
      links:[
        {label:'Project Submission', url:'https://plume.hackmit.org/project/mjsrl-usblo-cxihi-raipn'},
        {label:'Pitch Deck', url:'https://docs.google.com/presentation/d/1je3XuTlRVZ-OL6VsVOHjJJ89Jb2JKrijvty8Tk7cIgQ/edit?slide=id.p1#slide=id.p1'},
        {label:'GitHub', url:'https://github.com/raiya-m/capital-class/tree/main'}
      ],
      media:[
        {type:'embed', src:'https://www.youtube.com/embed/JVQ0rnomTtU', caption:'Capital Class — Demo Video'}
      ],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'We started with a simple question: why is investing so hard to learn? Personal finance is a subject most people only reach once real money is already on the line — and by then the cost of a bad first decision is real. The vocabulary arrives before any reason to care about it, and the people most likely to be taught at home are the people who needed the lesson least.'},
            {type:'stats', items:[
              {value:'27%', label:'Of U.S. adults answered at least 5 of 7 basic financial-knowledge questions correctly (FINRA NFCS, 2025)'},
              {value:'39', label:'States that require personal finance to graduate high school — the lesson arrives late, and usually without practice'}
            ]},
            {type:'cards', items:[
              {title:'Jargon before intuition', text:'Tickers, returns, diversification — the vocabulary comes before any reason to care about it.'},
              {title:'Real money, real risk', text:'Most people\'s first investing decision is made with money they can\'t afford to lose.'},
              {title:'Unequal exposure', text:'If money wasn\'t discussed at home, there\'s no safe place to practice or ask questions.'}
            ]},
            {type:'quote', text:'What if we could make investing engaging for younger audiences — middle schoolers — using the reward system their classrooms already run on?'}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'Rather than asking teachers to adopt a new behavior system, we looked at what classrooms already use. Behavior-points apps are effectively standard infrastructure in U.S. elementary and middle schools — students already earn points, and teachers already award them. The economy exists; it just terminates at the prize box.'},
            {type:'stats', items:[
              {value:'95%', label:'Of U.S. elementary and middle schools have at least one teacher using ClassDojo, a behavior-points app (company-reported)'}
            ]},
            {type:'table', headers:['','Today','With Capital Class'], rows:[
              ['What points become','Stickers, prizes and pizza parties','Capital to save, invest and learn'],
              ['Where motivation ends','At the reward','It compounds']
            ], highlightRow:1},
            {type:'p', text:'That reframing set the constraints for both user groups — and the two pull in different directions, so the design had to satisfy both to get used at all.'},
            {type:'cards', items:[
              {title:'Teacher — runs the economy', text:'Already awards points daily and has no appetite for a second system to maintain or a classroom they can\'t control.', list:[
                'Award tokens with a reason attached, so students see what they earned and why',
                'Set the exchange rate from tokens into market cash',
                'Publish classroom news events that move the market',
                'Stay in charge — AI assists in real time but never takes full control'
              ]},
              {title:'Student — middle schooler', text:'Motivated by the reward, not by finance. Needs a reason to care about a decision before the vocabulary will stick.', list:[
                'Three separate balances: unspent tokens, savings, and investment cash',
                'Savings still unlock the real classroom rewards they already want',
                'Trade without needing to know the jargon first',
                'Ask "why did that happen?" by voice or text and get an answer about their own portfolio'
              ]}
            ]}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'The classroom tools market splits cleanly in two: behavior-rewards apps that stop at the reward, and investing simulators that start at the ticker. We benchmarked the leaders in each category against the chain we wanted to build.'},
            {type:'table', headers:['System','What it is','Behavior rewards','Savings & rewards','Investing sim','AI coach'], rows:[
              ['ClassDojo','Behavior points + parent messaging','Core','—','—','—'],
              ['LiveSchool','School-wide points + reward store','Core','Core','—','—'],
              ['Classcraft','RPG-style class game (retired 2024)','Core','Partial','—','—'],
              ['The Stock Market Game','SIFMA\'s team portfolio sim, grades 4–12','—','—','Core','—'],
              ['Capital Class','Rewards → savings → investing → AI coach','Core','Core','Core','Core']
            ], highlightRow:4},
            {type:'p', text:'Every system above is built for the same middle-school band, so age isn\'t the differentiator — the chain is. Rewards tools own the earning half and never reach investing. The Stock Market Game owns the investing half but starts with money that was never earned, which is exactly the "reason to care" gap. No incumbent connects the two, and none explains the outcome back to the student. Based on public product pages and reviews, Sept 2026.'}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'Capital Class is a gamified investment education platform built on top of the behavior system schools already use. Tokens earned for real classroom behavior become capital a student has to actually decide what to do with — producing one complete learning loop every class period.'},
            {type:'cards', items:[
              {title:'1 — Earn', text:'Teacher awards tokens for real classroom behavior, each with a reason attached.'},
              {title:'2 — Allocate', text:'Student splits tokens between savings for classroom rewards and market cash, at the teacher-set exchange rate.'},
              {title:'3 — Invest', text:'Buy and sell across five sectors — technology, agriculture, transportation, energy and healthcare — including fractional shares.'},
              {title:'4 — Observe', text:'Classroom news events move sector prices, and the portfolio moves with them.'},
              {title:'5 — Understand', text:'Ask the AI coach why it happened, by voice or text, and get an answer about your own holdings.'}
            ]},
            {type:'p', text:'Three layers run underneath that loop:'},
            {type:'cards', items:[
              {title:'Class economy', text:'The half that already exists in schools — rebuilt so the points carry forward.', list:[
                'Tokens awarded with a reason attached',
                'Savings unlock real classroom rewards',
                'Teacher-set exchange rate into market cash'
              ]},
              {title:'Simulated market', text:'Five sectors with live prices, history and real portfolio mechanics.', list:[
                'Current prices, percentage changes and historical trends',
                'Isolate individual sectors on the chart',
                'Buy/sell orders including fractional shares'
              ]},
              {title:'AI news & coach', text:'The layer that turns a price move into a lesson.', list:[
                'Teacher-published classroom news moves sector prices',
                'Voice or text: "how does today\'s news affect the shares I own?"',
                'Answers grounded in that student\'s own portfolio'
              ]}
            ]},
            {type:'p', text:'The AI decisions were the ones we were most deliberate about. Rather than replacing the teacher or handing the model autonomy, AI adapts the simulated market and explains consequences in real time — inside hard limits:'},
            {type:'cards', items:[
              {title:'Teachers stay in charge', text:'Teachers run the economy and publish the news. AI assists in real time and never takes full control.'},
              {title:'Guardrails by design', text:'Every AI-proposed news impact is clamped to ±7% per sector, keeping the market realistic and teachable rather than chaotic.'},
              {title:'Grounded, not generic', text:'Every question ships with a live briefing — balances, holdings, sector prices, classroom news and recent conversation — so answers are about the student\'s own decisions.'}
            ]},
            {type:'p', text:'End to end, a spoken question runs: Deepgram transcribes it → the backend assembles the live briefing → OpenAI answers against that context → Deepgram speaks it back. Classroom state persists in SQLite, and role-based auth keeps the teacher and student experiences separate but connected.'}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'We shipped a working end-to-end prototype at HackMIT 2026 — not a clickable mock. A teacher can award tokens, publish a news incident, and watch it move the tape; a student can allocate, trade fractional shares across five sectors, and ask the coach out loud why their portfolio moved.'},
            {type:'stats', items:[
              {value:'5', label:'Tradable sectors — tech, agriculture, transportation, energy, healthcare'},
              {value:'±7%', label:'Hard clamp on every AI-proposed sector impact'},
              {value:'2', label:'Ways to ask the coach — voice or text'},
              {value:'1 weekend', label:'From concept to working demo'}
            ]},
            {type:'list', items:[
              'Complete loop shipped — earn, allocate, invest, observe, understand',
              'Three-balance model — unspent tokens, savings, and investment cash held separately',
              'Live market — prices, percentage changes, historical trends and per-sector isolation',
              'Voice coach — Deepgram STT → grounded OpenAI answer → Deepgram TTS, with a text fallback',
              'Persistent classroom state in SQLite behind role-based teacher/student views'
            ]},
            {type:'p', text:'Where it goes from a hackathon build to a homeroom:'},
            {type:'cards', items:[
              {title:'Pilot', text:'Run a semester pilot with middle-school teachers who already use points.'},
              {title:'Plug in', text:'Import points from existing systems like ClassDojo, so teachers change nothing.'},
              {title:'Insights', text:'Show teachers how each student saves, diversifies and reacts to news.'},
              {title:'Standards fit', text:'Map activities to personal-finance standards so it counts as class time.'}
            ]},
            {type:'quote', text:'Investing feels abstract until you have a decision to make and a reason to care about the outcome. Capital Class gives students that experience early — a chance to weigh their options, see what happens, and ask why.'}
          ]
        }
      ]
    },
    ex06: {
      ticket:'EX-06', category:'Case Competition', title:'Whispr',
      role:'Product Manager', timeline:'Dec 2025 - Feb 2026', team:'1 UX Designer, 1 Engineer',
      skills:['Product Strategy','Consumer Research','Persona Development','Competitive Analysis','Market Sizing (TAM/SAM/SOM)','Unit Economics & COGS Modeling','Pricing Strategy','Go-to-Market Strategy','Brand & Campaign Strategy','Inclusive Design','Lifecycle Sustainability','Hardware Concept Design','Mobile App UX','KPI Definition'],
      awards:[],
      links:[
        {label:'Pitch Deck', url:'https://drive.google.com/file/d/1Jt1Um8Muyma5lZGwaO9_wkCb-FLxrXk3/view?usp=sharing'}
      ],
      media:[],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Social media has accelerated the rise of "It" scents and a culture of dupes, rapidly eroding exclusivity and long-term attachment. At the same time, over 40% of selective fragrance users wear perfume to treat themselves or enhance their mood and well-being — yet brands lock customers into fixed compositions and intensities, with no ability to adapt over time.'},
            {type:'cards', items:[
              {title:'Hype & imitation', text:'A scent goes viral, dupe brands replicate the profile within months, and the exclusivity a customer paid a premium for quietly disappears.'},
              {title:'Locked compositions', text:'One fixed blend at one fixed intensity — no way to adapt to mood, context, or the difference between a workday and a night out.'}
            ]},
            {type:'stats', items:[
              {value:'40%+', label:'Of selective fragrance users wear perfume to treat themselves or enhance mood and well-being'}
            ]},
            {type:'quote', text:'Consumers want unique, customizable scent experiences that cannot be duplicated, while brands need new ways to maintain long-term brand loyalty.'}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'We profiled three distinct groups across the fragrance market. They arrive from very different places — one intimidated by it, one constrained by their environment, one already experimenting — but all three hit the same wall: a bottle cannot adapt once it is bought.'},
            {type:'cards', items:[
              {title:'Confidently Curious', text:'Millennials to early Gen X (25–45), urban. Values accessibility, confidence-building, ease of use and social safety.', list:[
                'Interested in fragrance but unsure how to choose or wear it "correctly"',
                'Intimidated by jargon and choice overload',
                'Concerned about over-applying or offending others'
              ]},
              {title:'Context Navigators', text:'Young professionals & students (20–35), urban. Values control, adaptability, professional safety and discretion.', list:[
                'Love fragrance but work in scent-sensitive environments',
                'Want control over when, where, and how much scent they wear',
                'View fragrance as identity, but also as a responsibility'
              ]},
              {title:'Personalization Seekers', text:'Gen Z to Millennials (18–35), urban & suburban. Values creativity, personal expression, customization and discovery.', list:[
                'Already engaged with fragrance',
                'Interested in layering, mood-based scent and self-expression',
                'Frustrated by static perfume formats'
              ]}
            ]},
            {type:'p', text:'The through-line is control — over intensity, over blend, over context. That framing set the product requirement: personalization could not be a one-time quiz at purchase. It had to stay adjustable every day the product is worn.'}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'The fragrance market splits into three categories, and each solves part of the problem while creating another. We mapped them against the one thing all three target users asked for — ongoing control.'},
            {type:'table', headers:['Category','Examples','Strength','Where it falls short'], rows:[
              ['Luxury & Niche Houses','Chanel, Dior, Tom Ford, Le Labo, Byredo','High-quality fixed formulations that emphasize craftsmanship and signal prestige','Personalization is limited, and exclusivity fades as scents become widely recognized or replicated'],
              ['Dupe & Inspired Brands','Dossier, ALT. Fragrances, Oil Perfumery, Zara','Replicate popular fragrance profiles at lower prices, increasing accessibility','Prioritize imitation over originality — limiting emotional attachment, perceived luxury and long-term brand loyalty'],
              ['Digital & Custom Services','Scentbird, Waft, Phlur, Algorithmic Fragrance','Use quizzes or AI to "personalize" scent selection','Typically deliver a single, mass-produced formula with limited adaptability and little true uniqueness over time'],
              ['Whispr','L\'Oréal Luxe','Hardware-enabled personalization — layer up to four fragrances, control diffusion intensity, and adapt by context','Concept stage; depends on hardware manufacturing and a companion app ecosystem']
            ], highlightRow:3},
            {type:'p', text:'No incumbent lets the wearer change the composition after purchase. That is the opening Whispr was built for — and it is a sizeable one:'},
            {type:'stats', items:[
              {value:'$43B', label:'TAM (CAD) — ~200MM global consumers who regularly purchase prestige fragrances'},
              {value:'$10B', label:'SAM (CAD) — ~35MM digitally native consumers seeking personalized scent across NA, EU & East Asia'},
              {value:'$75MM', label:'SOM (CAD) — ~263K early adopters and fragrance/fashion/tech enthusiasts (0.75% of SAM)'}
            ]}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'Whispr is a fragrance personalization collection for L\'Oréal Luxe, built around a single idea: move the scent decision out of the bottle and onto the wearer. It ships as two products that work together.'},
            {type:'cards', items:[
              {title:'Whispr Brooch', text:'A wearable fragrance diffuser that blends fashion and technology — fragrance layering, diffusion strength control, and AI scent discovery through the companion app.'},
              {title:'Discovery Flights', text:'Pre-filled cartridges holding four curated L\'Oréal Luxe fragrances, removing the risk from discovery and letting users experiment before committing to full-size refills.'}
            ]},
            {type:'media', items:[
              {type:'diagram', src:'images/media/ex06/whispr-product-mockups.png', caption:'Whispr Brooch, Discovery Flight cartridges, and the collection gift set'}
            ]},
            {type:'p', text:'Inside the brooch:'},
            {type:'cards', items:[
              {title:'Modular fragrance cartridge', text:'Houses up to four fragrances behind vapor-permeable membrane O-rings for even diffusion without spillage. Durable, reusable, and refillable with any L\'Oréal Luxe fragrance.'},
              {title:'SmartHead SLT heater', text:'Four low-voltage heaters form a ring, controlling diffusion precisely by adjusting heat across individual quadrants. Integrated temperature sensors prevent overheating.'},
              {title:'Circuit board & LiPO battery', text:'A circular board with a Bluetooth module connects to the app, with an insulation layer protecting against heat damage. Charges on a wireless dock.'},
              {title:'Embellished lid & magnetic pins', text:'An artisan-crafted lid made from recycled metal alloys fastens magnetically to clothing — deliberately gender-neutral so it reads as jewellery, not a gadget.'}
            ]},
            {type:'p', text:'The companion app is what turns the hardware into a system — it is where personalization actually lives:'},
            {type:'cards', items:[
              {title:'1 — Scent Control', text:'Set your scent in real time, with personal control over intensity, blend and projection, so you can feel confident without overwhelming anyone else.'},
              {title:'2 — Scent Schedule', text:'Save combinations and release them at set moments across a day or week — automating scent and intensity for professional, personal and social contexts.'},
              {title:'3 — Insights & Recommendations', text:'Builds an understanding of the wearer\'s scent profile and returns curated recommendations linked directly to L\'Oréal Luxe products.'}
            ]},
            {type:'p', text:'Discovery Flights ship as three curated starting points, each built entirely from the existing L\'Oréal Luxe portfolio:'},
            {type:'table', headers:['Flight','Character','Fragrances'], rows:[
              ['Fresh Confidence','Clean and energizing','Armani Acqua di Giò · Prada Luna Rossa · Maison Margiela Under the Lemon Trees · YSL Y Eau Fraîche'],
              ['Modern Woods','Warm and grounding','YSL Y EDP · Maison Margiela By the Fireplace · Prada L\'Homme · Armani Code'],
              ['Statement Nights','Bold and expressive','YSL Black Opium · Maison Margiela Jazz Club · Valentino Uomo Born in Roma · Armani Stronger With You']
            ]},
            {type:'p', text:'Two constraints shaped the design from the start rather than being added at the end:'},
            {type:'cards', items:[
              {title:'Inclusivity', text:'Accessibility was treated as a design input, not a marketing line.', list:[
                'Gender-neutral brooch, designed to celebrate all expressions of beauty',
                'Diffusion can be dialled down to comply with scent-free workplace policies',
                'Controlled, predictable diffusion patterns for neurodivergent users who may experience sensory overload',
                'Priced at the lower end of the premium spectrum to widen economic access'
              ]},
              {title:'Sustainability', text:'Designed against L\'Oréal\'s For The Future 2030 roadmap across the full product lifecycle.', list:[
                'Brooch crafted from >70% recyclable materials by weight',
                'Refillable cartridges cut single-use fragrance packaging by up to 80%',
                'Cartridges constructed from recycled L\'Oréal Luxe glass fragrance bottles',
                'On-demand diffusion reduces daily fragrance consumption ~50–70%, extending cartridge lifespan 2–3×'
              ]}
            ]}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'As a concept entry, the deliverable was the business case rather than a shipped product — so we pressured the idea on the numbers: what it costs to build, what it sells for, how it reaches market, and how we would know it was working.'},
            {type:'stats', items:[
              {value:'86%', label:'Gross margin on the brooch — $17.00 COGS at $120.00 retail'},
              {value:'87%', label:'Gross margin on an empty cartridge — $1.30 COGS at $10.00 retail'},
              {value:'72%', label:'Gross margin on a Discovery Flight — $7.80–$9.80 COGS at $27.00–$35.00 retail'},
              {value:'60–85%', label:'Industry benchmark gross margin for luxury and niche fragrance brands'}
            ]},
            {type:'p', text:'Pricing was benchmarked against both luxury fragrance margins and existing wearable tech, then set against a bottom-up bill of materials:'},
            {type:'table', headers:['Assembly','Description','Cost (CAD)'], rows:[
              ['Thermal System','Heating mechanisms for fragrance diffusion','$1.60'],
              ['Electronics and Power','Power, sensors, circuit boards, Bluetooth modules','$13.00'],
              ['Assembly Hardware','Hardware and adhesives needed for assembling the brooch','$0.95'],
              ['Cartridge','Fragrance cartridge hardware','$1.00']
            ]},
            {type:'p', text:'Go-to-market runs as a three-phase rollout, sequenced by how each region treats fragrance:'},
            {type:'cards', items:[
              {title:'Phase 1 — North America', text:'Consumers are open to experimentation and use fragrance for confidence and self-expression, and wearable-tech adoption is strong — an ideal test market. Launch via pop-ups, social campaigns and traditional media.'},
              {title:'Phase 2 — Europe', text:'Once validated in NA, expand into the world\'s most mature fragrance market, where craftsmanship and ritual matter — positioning Whispr as a refined extension of daily self-care.'},
              {title:'Phase 3 — East Asia', text:'Fragrance adoption is growing fast and scent signals individuality. A strong gifting culture and preference for subtle scent make Discovery Flights the lead product here.'}
            ]},
            {type:'p', text:'The launch campaign, #DefineYourSignature, was designed to scale globally without losing the intimacy that makes the product feel luxury:'},
            {type:'cards', items:[
              {title:'The Quiet Runway', text:'A physical activation turning Toronto\'s Union Station into a fashion-and-fragrance experience — everyday people walk a quiet runway diffusing their own signature scent, while AI kiosks let passersby discover theirs and save it to the app.'},
              {title:'Creator-led UGC', text:'Diverse Gen Z creators and everyday voices define their signature fragrance in short-form content, building cultural relevance and trust through real lived experience rather than polished brand film.'}
            ]},
            {type:'p', text:'Success metrics we committed to tracking through each launch phase:'},
            {type:'list', items:[
              'Total units sold',
              'Daily active devices',
              'Average daily session duration',
              'Return rate',
              'Customer Satisfaction Score (CSAT)',
              'App-driven refill purchases'
            ]},
            {type:'quote', text:'Wear your scent. Your way. — the whole concept rests on one bet: that in a market where exclusivity is being eroded by imitation, the thing that cannot be duplicated is a scent the wearer composes themselves.'}
          ]
        }
      ]
    },
    ex07: {
      ticket:'EX-07', category:'Pitch Competition', title:'Paved Pathway',
      role:'Product Manager', timeline:'2024 — Red Bull Basement', team:'1 Engineer',
      skills:['Product Management','IoT Architecture','LoRaWAN','Embedded Systems (ESP32)','Doppler Radar Sensing','Piezoelectric Energy Harvesting','SolidWorks / Fusion 360','3D Printing & Prototyping','Modular Product Design','BOM & Cost Modeling','Market Sizing','Go-to-Market Planning','Pitching & Storytelling','Stakeholder Communication'],
      awards:['National Finalist @ Red Bull Basement 2024'],
      links:[
        {label:'Pitch Deck', url:'https://docs.google.com/presentation/d/1AHmfNNtDG1C9MGxVSYt9g016MXl1s00tizn9KDYmBpA/edit?usp=sharing'}
      ],
      media:[
        {type:'embed', src:'https://www.youtube.com/embed/mwiCfW0I9QE', caption:'Paved Pathway — Red Bull Basement National Finals 2024'}
      ],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Several crosswalks on UBC\'s campus are extremely dimly lit at night. The year we entered, several first-year students were killed on campus in a motor vehicle collision — which turned a problem we walked past every day into the one we wanted to work on. The question was not how to redesign the crosswalk, but how to make a pedestrian visible, and warn both sides, before anyone has to react.'},
            {type:'stats', items:[
              {value:'12M', label:'Pedestrians severely injured by motor vehicles each year, globally'},
              {value:'74%', label:'Of those crashes occur due to poor visibility'}
            ]},
            {type:'cards', items:[
              {title:'Pedestrians disappear after dark', text:'On an unlit crosswalk a person is effectively invisible to an approaching driver until they are already in the road — the one moment where being seen earlier matters most.'},
              {title:'Nothing intervenes in time', text:'A dangerous approach speed only becomes obvious once it is too late to act. Nothing warns the pedestrian stepping out, and nothing tells the city it happened.'}
            ]},
            {type:'p', text:'The objective: a platform that illuminates pedestrians at night, detects dangerous vehicle behaviour, and alerts both pedestrians and authorities before an incident — cheap enough and simple enough to install that a city could put one at every crosswalk, not just the worst one.'}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'Two groups have to be served at once, and they constrain the product in completely different ways. A pedestrian only benefits from protection that requires nothing of them; a city only deploys infrastructure it can actually afford to buy, install and maintain at scale. Either one alone produces the wrong product.'},
            {type:'cards', items:[
              {title:'Pedestrian — crossing at night', text:'Wants to be seen and warned, but will not carry a beacon, install an app, or look at a phone mid-crossing.', list:[
                'Illumination has to trigger from the act of stepping onto the crosswalk',
                'Warnings must be readable on the ground, in the direction they are already looking',
                'Protection must work for someone who has never heard of the product'
              ]},
              {title:'City & authorities — buying and maintaining it', text:'Wants measurable safety improvement without a capital project per intersection.', list:[
                'Low enough unit cost to justify broad deployment, not a single pilot site',
                'Installs at an existing crosswalk without rebuilding the intersection',
                'Cannot depend on strong wifi coverage at the roadside',
                'Should return data on dangerous driving, not just react to it'
              ]}
            ]},
            {type:'p', text:'Those constraints are what produced the two least obvious decisions in the build — harvesting power from footsteps rather than trenching for mains power, and choosing LoRaWAN over wifi. We grounded them in direct observation of campus crosswalks and the realities of municipal procurement; validating them with city stakeholders was scoped as part of the planned UBC pilot rather than something we had completed at pitch time.'}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'The existing answer to an unsafe crosswalk is a pedestrian hybrid signal — effective, but priced as a capital project. That price is the reason dangerous crosswalks stay dangerous: a city can only afford to fix the very worst ones.'},
            {type:'table', headers:['Option','What it does','Cost'], rows:[
              ['Pedestrian Hybrid Signal (PEDSAFE)','Signalized beacon installation at the crosswalk','$50,000 – $120,000 per unit, plus ongoing maintenance fees'],
              ['Standard crosswalk','Paint and signage only — no illumination, no detection, no alerting','Low cost, no active protection'],
              ['Paved Pathway','Kinetic-powered illumination, doppler speed detection, LoRaWAN alerting, modular install','~$200 per module (~$165 bill of materials)']
            ], highlightRow:2},
            {type:'stats', items:[
              {value:'~$165', label:'Estimated bill of materials per module'},
              {value:'$50K–$120K', label:'Cost of the conventional alternative it undercuts'}
            ]},
            {type:'p', text:'The platform also generalizes well beyond crosswalks — anywhere footfall is dense and lighting or sensing is needed, the same kinetic tile applies. We mapped six secondary markets:'},
            {type:'list', items:[
              'Highways — larger tiles powering tunnel/bridge lights, cameras and road signs',
              'Event spaces, concerts & sports fields — floodlights, scoreboards, and interactive displays driven by crowd movement',
              'Staircases — platforms from the base of the stairs illuminating steps ahead',
              'Restrooms — powering water pumps and ventilation at festivals and emergency shelters',
              'Healthcare facilities — lighting hallways at night and reporting unusual movement to staff',
              'AR/VR gaming areas — responding to user movement for a more interactive experience'
            ]}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'Paved Pathway is an IoT smart platform that proactively protects pedestrians. It lights the person crossing, watches the vehicles approaching, and tells every other crosswalk in the city what it just saw — all from a tile that installs on top of an existing crosswalk.'},
            {type:'cards', items:[
              {title:'Kinetic-powered illumination', text:'A piezoelectric tile generates power from the movement of pedestrians stepping on the platform, lighting them the moment they step on. Solar-powered lights supplement the prototype for robustness.'},
              {title:'Doppler radar detection', text:'Radar modules at the front of the platform detect speeding vehicles on approach — turning the crosswalk itself into the sensor rather than adding roadside equipment.'},
              {title:'LoRaWAN mesh', text:'LoRa modules carry alerts to authorities and to neighbouring platforms. Chosen over wifi because it is long range, needs no strong wifi coverage at the roadside, and transmits even through concrete buildings.'},
              {title:'Dot matrix display', text:'A programmable display on the platform surface shows real-time warnings to pedestrians — including dangers detected by a different Paved Pathway elsewhere in the city.'}
            ]},
            {type:'p', text:'Those four pieces produce one behaviour chain when a vehicle approaches too fast:'},
            {type:'cards', items:[
              {title:'1 — Detect', text:'Doppler radar at the crosswalk identifies a speeding vehicle on approach.'},
              {title:'2 — Report', text:'The alert is sent to authorities and city officials over LoRaWAN, building a record of where dangerous driving actually happens.'},
              {title:'3 — Warn', text:'The alert propagates to nearby Paved Pathways, which display real-time warnings to pedestrians about to step out.'}
            ]},
            {type:'p', text:'The system was designed for modular assembly — each module works on its own, but they combine when the site calls for it. That is what lets a city scale coverage to the intersection rather than buying a fixed installation:'},
            {type:'cards', items:[
              {title:'Curb module', text:'The entry point at the kerb — illumination and the pedestrian-facing display.'},
              {title:'Corner module', text:'Wraps the corner of an intersection where pedestrian paths converge.'},
              {title:'Central tile module', text:'Fills the crossing itself, extending illumination and power generation across the span.'}
            ]},
            {type:'p', text:'Combined, they form a full intersection assembly; standalone, a single module still protects a small crosswalk — which is where most of the unlit risk actually sits.'}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'Paved Pathway reached the National Finals of Red Bull Basement 2024, where the judged deliverable was a 60-second pitch and a credible plan to build rather than a finished product. At that point it existed as a CAD design, a costed bill of materials, and a modular assembly plan — the MVP build was deliberately scoped as the first sprint of what came next.'},
            {type:'cards', items:[
              {title:'Sprint 1 — MVP', text:'Build the curb platform: illuminating surface, kinetic energy power production, and real-time alerts on the visual display.'},
              {title:'Sprint 2 — Global Finals', text:'Take insights from industry professionals at Global Finals back to Vancouver, focusing on how alerts reach officials.'},
              {title:'UBC Pilot Test', text:'Partner with UBC to test Paved Pathway on the campus crosswalks that motivated it.'},
              {title:'Sprint 3 — Iterate', text:'Fold pilot findings back into the design and improve the platform.'},
              {title:'Accelerator', text:'Work with industry leaders and mentors to take the product to the next level.'}
            ]},
            {type:'p', text:'The strongest validation was the cost argument holding up under scrutiny: at roughly $165 in components, protecting a crosswalk stops being a capital decision and becomes a procurement line item — which is the only version of this product a city can deploy everywhere rather than once.'},
            {type:'quote', text:'Pedestrian safety has never been more accessible, with each unit costing less than a fraction of smart crosswalks. Join us on our mission to pave a safer and smarter future for pedestrians and cities worldwide.'}
          ]
        }
      ]
    },
    ex08: {
      ticket:'EX-08', category:'Design Competition', title:'LeftOver Lifeline',
      role:'Product Manager', timeline:'2023 - 2024', team:'2 UX/UI Designers, 1 UX Researcher',
      skills:['Product Management','User Research','Survey & Poll Design','Persona Development','User Journey Mapping','Competitive Analysis','Figma Prototyping','UX/UI Design','Gamification Design','Trust & Safety Design','Monetization Modeling','Partnership Strategy','Pitching & Storytelling'],
      awards:['1st Place @ 2023 UXplore Competition','Semifinalist @ 2024 Innovation Onboard Pitch Competition'],
      links:[
        {label:'Figma Prototype', url:'https://www.figma.com/proto/qDR4GssUQr2VACJhuBFbCa/LeftOver-Lifeline?type=design&node-id=23-522&t=HHj27dCGbBA8QhDI-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=23%3A522&show-proto-sidebar=1'},
        {label:'Pitch Deck', url:'https://drive.google.com/file/d/1jRYNoiRxs4SVQHKQ_PgEBFIMYf8NT7X_/view'},
        {label:'Innovation Onboard Poster', url:'https://docs.google.com/presentation/d/1uVUGrP5_JuRQK2vaTz90bhTQMYgveaxE/edit?slide=id.p1#slide=id.p1'}
      ],
      media:[],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Two problems sit next to each other on a university campus and never meet. Food gets thrown away because someone cooked too much, while students a building over skip meals because groceries cost more than their budget allows. The infrastructure meant to bridge that gap — the food bank — is the one thing many students will not use.'},
            {type:'stats', items:[
              {value:'35%', label:'Of UBC Vancouver undergraduates face food insecurity (40% at UBC Okanagan)'},
              {value:'500%', label:'Increase in AMS Food Bank visits in 2022 versus pre-pandemic'},
              {value:'83%', label:'Drop in UBC funding for food security programs in 2022/23'},
              {value:'1.17B', label:'Tonnes of food wasted globally each year'}
            ]},
            {type:'p', text:'The usage data says the same thing the students did. Across 116,963 Greater Vancouver Food Bank visitors, just 9% of visitors accounted for 65% of all visits — a small group relying on it heavily, while most people who need help never return.'},
            {type:'quote', text:'Most people who are struggling with severe food insecurity do not see food banks as a solution to their problem. — PROOF, University of Toronto'},
            {type:'p', text:'That reframed the project. The shortage was not food, and it was not need — it was stigma. So the guiding question became: how can we destigmatize food banks and donations?'}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'We needed to know whether students would actually participate on both sides of an exchange, so we went where they already were — running slider polls through Instagram stories and following up with structured interview questions about habits, comfort levels and awareness.'},
            {type:'stats', items:[
              {value:'26', label:'Responses on comfort receiving another member\'s surplus food (156 views)'},
              {value:'15', label:'Responses on comfort donating surplus food (117 views)'},
              {value:'5', label:'Structured interview questions on habits, comfort and awareness'}
            ]},
            {type:'list', items:[
              'On a scale of 1–10, how comfortable would you feel receiving another UBC member\'s surplus food or grocery items?',
              'On a scale of 1–10, how comfortable would you feel sharing your surplus food or grocery items?',
              'How often do you have leftover food or produce in your house?',
              'How many people do you know who have struggled, or are struggling, with food insecurity?',
              'What are your thoughts on UBC\'s reduction in funding for subsidized meal programs?'
            ]},
            {type:'p', text:'The responses confirmed both halves of the exchange existed on the same campus — surplus on one side, need on the other, and discomfort in the middle:'},
            {type:'quote', text:'I occasionally have to throw out food in my household since I tend to prepare too much for one person. … I know a few friends who are struggling to keep their expenses below their budget, especially with rising prices of groceries. … UBC food prices are relatively more expensive in comparison to other areas in the Lower Mainland.'},
            {type:'p', text:'Two personas came out of it, and we mapped a user journey for each:'},
            {type:'cards', items:[
              {title:'Sarah — the Sharer', text:'21, Vancouver, 3rd-year Cognitive Systems student.', list:[
                'Habit: makes too much food at once',
                'Habit: gets sick of leftovers easily, so food gets thrown away',
                'Goal: find an easy way to save her excess leftovers',
                'Goal: help people with her surplus rather than binning it'
              ]},
              {title:'Simon — the Receiver', text:'26, Vancouver, 2nd-year Master\'s student.', list:[
                'Habit: too busy with schoolwork to collect vouchers at Sprouts',
                'Constraint: stretched by international tuition',
                'Goal: find cheaper alternatives for meals',
                'Goal: avoid lining up at a local food bank'
              ]}
            ]},
            {type:'p', text:'Simon is the whole design brief in one line. He qualifies for help, he knows where it is, and he will not go — because being seen in the queue costs more than the meal is worth. Anything we built had to let him receive food without being identified as someone who needed it.'}
          ]
        },
        {
          title:'Competitor/Market Analysis',
          blocks:[
            {type:'p', text:'Food-waste apps already exist, and they work — but each solves one slice of the problem, and none of them touches the stigma that keeps people out of the system in the first place.'},
            {type:'table', headers:['Product','Model','What it does','Where it leaves a gap'], rows:[
              ['Too Good To Go','Business to consumer','Sells restaurants\' leftover food in discounted "magic bags"','Commercial surplus only — no peer-to-peer sharing, and buying still requires paying'],
              ['OLIO','Peer to peer','Platform for neighbours to share surplus food','Public profiles and listings; no anonymity for people who need food rather than want to swap it'],
              ['NoWaste','Personal utility','Tracks food expiry in the user\'s own pantry','Prevents waste in one household — never connects surplus to anyone who needs it'],
              ['Food banks','Donations','Distribute donated food to people in need','The stigma barrier itself — a last resort most students avoid'],
              ['LeftOver Lifeline','Hybrid P2P + donations','Anonymous, gamified campus marketplace combining donations and a surplus market','Campus-scoped at launch; depends on institutional partnerships to scale']
            ], highlightRow:4},
            {type:'p', text:'That is the opening: long-term stigmatization around food donations, food scarcity and food waste is the gap every incumbent leaves open. We scoped the launch tightly around a community that already has a trust layer we could borrow — UBC\'s own login system:'},
            {type:'cards', items:[
              {title:'Primary users', text:'UBC faculty and students — a closed, verifiable community where anonymity can be offered safely because identity is still authenticated behind the scenes.'},
              {title:'Secondary users (post-scale)', text:'University students more broadly, low-income families, and families with children under 18.'},
              {title:'Launch partners', text:'AMS Sustainability, Sprouts, Agora Cafe, the AMS Food Bank, and local businesses — existing food-security infrastructure rather than competitors.'}
            ]}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'LeftOver Lifeline is a community food-sharing app that connects people with surplus food to people who need it. The product decisions all follow from one constraint: a receiver must never have to identify themselves as someone in need.'},
            {type:'cards', items:[
              {title:'Decentralized food sharing', text:'A dual model — donations alongside a surplus marketplace — so the same app serves generosity and ordinary exchange, which is what makes using it unremarkable.'},
              {title:'Anonymous usership', text:'Identities are protected on both sides, removing the visibility that makes asking for food feel like an admission.'},
              {title:'Security', text:'UBC CWL authentication, terms of agreement, and in-app reporting keep a community that is anonymous to each other still accountable to the platform.'},
              {title:'Community-centric focus', text:'Both individuals and businesses participate, reducing food waste while building local connections rather than one-way charity.'},
              {title:'Gamification', text:'Karma, levels and achievements create a positive feedback loop — recognition for giving, and a reason to come back.'}
            ]},
            {type:'p', text:'The gamification layer is doing real work here, not decoration. It reframes participation as status rather than need:'},
            {type:'cards', items:[
              {title:'Tiered "spoon" system', text:'Users climb from Bronze to Platinum as positive interactions accumulate, turning repeat sharing into visible standing in the community.'},
              {title:'Level perks', text:'Each tier unlocks premium features, coupons, and gift cards from business partners — tying the reward loop back to local businesses.'},
              {title:'Premium features', text:'Ad-free use, instant alerts, increased food vouchers, and higher priority and visibility for items posted to the marketplace.'}
            ]}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'The concept won 1st Place at the 2023 UXplore Competition and went on to reach the semifinals of the 2024 Innovation Onboard Pitch Competition, carried from a research-backed UX case into a business case with a funded path to launch. The deliverable was a fully interactive Figma prototype covering both the sharer and receiver journeys end to end.'},
            {type:'p', text:'We modelled revenue against a 26,000-user campus base, mixing external funding with user-generated revenue so the platform would not depend on charging the people it exists to help:'},
            {type:'table', headers:['Revenue stream','Assumptions','Monthly revenue (CAD)'], rows:[
              ['Transaction fees','26,000 users · 5 monthly transactions each · 10% fee · 60% retention','$7,800'],
              ['Premium feature fees','26,000 users · 3% conversion · $5 per month','$3,900'],
              ['Advertising fees','26,000 users · 30 monthly impressions · $1 CPM · 60% retention','$468']
            ], highlightRow:0},
            {type:'stats', items:[
              {value:'$12.2K', label:'Modelled monthly revenue at a 26,000-user campus base'},
              {value:'3', label:'Independent revenue streams, none charging receivers'},
              {value:'5', label:'Launch partners identified across campus food security'}
            ]},
            {type:'p', text:'Alongside that, direct support was scoped through grants, donations and corporate social responsibility partnerships, with white-label licensing to other campuses as the scaling path — the same product sold to the institution rather than the student.'},
            {type:'quote', text:'Share, care, and make a difference. The measure of success was never how much food moved — it was whether someone who needed a meal felt able to take one.'}
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
