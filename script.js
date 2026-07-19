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
      role:'Product Manager and Software Developer', timeline:'Sep 2025 - Apr 2026', team:'2 mech eng, 1 elec/cpen eng',
      skills:['Engineering Project Management','Product Strategy','Feature Prioritization','User Research','UI/UX Design','Hardware System Testing','React','FastAPI','SQLite','Docker','MQTT','Raspberry Pi 4','ESP32','RFID','Figma'],
      awards: ['Argosy Foundation VC Grant ($2000 USD)'],
      links:[{label:'Case study deck', url:'#'}],
      media:[
        {type:'embed', src:'https://drive.google.com/file/d/1JKAa2pRLLg5ju3PzHHLY6Y0tavtb8FOu/preview', caption:'Haven demo — tool dispense'},
        {type:'embed', src:'https://drive.google.com/file/d/1_gDuCNytxGZa6KlN6M9dPfg-RM9f4aUB/preview', caption:'Haven demo — tool return'}
      ],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'The Integrated Engineering Shop (IGEN Shop) is the only student-run makerspace at the University of British Columbia (UBC). The shop supports over 250 users and 30+ capstone projects each year, creating an environment where tools are frequently moved, misplaced, or stolen. Over the past two years, the IGEN Shop has accumulated over $3,000 in tool losses. While there are existing industry solutions, they are either prohibitively expensive (over $95,000), lack necessary security features, or fail to integrate seamlessly into makerspace environments. This reveals a gap: small shops need effective and affordable solutions for tool tracking and loss prevention.'},
            {type:'quote', text:'Our goal was simple: design an affordable smart tool vending machine for on-campus workshops that can dispense and track tools in real time, minimizing theft or loss.'},
            {type:'media', items:[
              {type:'diagram', src:'images/media/ex01/problem-stats.png', caption:'$3,000 in tool losses, $95K+ commercial solutions, and a clear need for tracking'}
            ]}
          ]
        },
        {
          title:'User Research',
          blocks:[
            {type:'p', text:'To understand user needs, 50+ IGEN Shop supervisors and frequent student workshop users were interviewed to understand existing workflows and pain points. Through these user groups, I led the team to identify the following needs and constraints:'},
            {type:'table', headers:['User Group','Needs','Constraints'], rows:[
              ['IGEN Shop Supervisors',
                ['Easy to use and maintain system with minimal training','Alert system for potential tool theft','Access control (limits on quantity, duration, and user access)','Tool tracking (who has what and for how long)'],
                ['Must not obstruct shop space; requires wall power','Must comply with UBC FIPPA data privacy regulations']],
              ['Student Users',
                ['Fast interaction with minimal workflow disruption','Reliable tool availability','Intuitive, no training required interface'],
                ['Physically accessible dispensing/return system','Future iterations of device should not affect workflow']]
            ]}
          ]
        },
        {
          title:'Competitive/Market Analysis',
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
            {type:'media', items:[
              {type:'image', src:'images/media/ex01/competitor-robocrib.png', caption:'Robocrib — self-serve locker system'},
              {type:'image', src:'images/media/ex01/competitor-kabtrak.png', caption:'kabTRAK — electronically controlled toolbox'},
              {type:'image', src:'images/media/ex01/competitor-gigatrak.png', caption:'gigatrak — asset management software'}
            ]},
            {type:'p', text:'Existing commercial systems such as RoboCrib, kabTRAK, and GigaTrak demonstrated strong inventory management capabilities but were either prohibitively expensive, difficult to customize, or designed for industrial environments rather than university makerspaces. This provides an opportunity for Haven to be designed to provide comparable accountability at a fraction of the cost while integrating directly into existing workshop workflows.'}
          ]
        },
        {
          title:'Solution',
          blocks:[
            {type:'p', text:'Haven is a smart tool management kiosk that combines RFID authentication, a mobile web application, automated dispensing, real-time inventory tracking, and an admin dashboard to create accountability while preserving a seamless user experience. Some key features include:'},
            {type:'list', items:['Mobile application','RFID authentication','Automated tool dispensing and returning','Admin dashboard','Real time inventory tracking','Storage of up to 30 unique handheld tools']},
            {type:'media', items:[
              {type:'diagram', src:'images/media/ex01/dispense-return-flow.png', caption:'Tool dispense and return flow, 5 steps each'}
            ]}
          ]
        },
        {
          title:'Results',
          blocks:[
            {type:'p', text:'The prototype underwent 152 integrated dispense-and-return cycles across multiple tool geometries and storage levels, achieving an overall reliability of 96%. Overall, Haven was able to:'},
            {type:'list', items:['Support 30 distinct tools','Serve 250+ workshop users','Complete dispense/return cycle in under 30 seconds','Stay within the $3.7K CAD project budget versus commercial systems costing $30K–95K','Design modularly for future expansion']}
          ]
        }
      ]
    },
    ex02: {
      ticket:'EX-02', category:'Capstone', title:'TRASH-E',
      role:'Product Manager & Software Developer', timeline:'Sep 2023 - May 2024', team:'2 mechanical engineers, 1 electrical engineer, 1 computer engineer',
      skills:['User Interviews','Needs → Specs Traceability','MVP Scoping','Weighted Decision Matrices','Validation & Verification','Socio-Economic Impact Assessment','Budget Ownership','Stakeholder Pitching','ArduPilot','Mission Planner','MAVLink','GPS Waypoint Navigation','Python / Flask','Intel RealSense D455','Raspberry Pi 5','Arduino','HTTP / UDP Streaming'],
      awards:['1st Place Sustainability Category @ CSME 2025 National Design Competition', 'Runner-Up Collegiate Prototype @ 2024 Canada Tech Futures Challenge', 'Biggest Pivot Since Pitch @ 2024 Canada Tech Futures Challenge'],
      links:[],
      media:[],
      sections:[
        {
          title:'Problem',
          blocks:[
            {type:'p', text:'Cleanup products overwhelmingly skim surface debris — but research across 23 countries shows plastic density is highest in small waterways, and most of it settles on the lakebed. Today the only way it comes out is by volunteer scuba divers searching blindly by hand, exposed to decompression sickness, hypothermia, and drowning risk with every extra minute underwater.'},
            {type:'stats', items:[
              {value:'1M + 100K', label:'Seabirds and marine animals killed by plastic pollution each year'},
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
          title:'Competitive/Market Analysis',
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
      role:'Product Design & Development', timeline:'[add project timeline]', team:'[add team size/composition]',
      skills:['Bentley iTwin','React','TypeScript','API Design & Integration','IoT Sensor Integration','UI/UX Design','Agentic AI','Market & Regulatory Research','Business Modeling'],
      awards:[],
      links:[],
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
            {type:'p', text:'The team conducted direct consultations with two fire departments — Vancouver Fire Department (VFD) and a second department (TFD) — to validate current-state pain points before building. Key findings from these conversations:'},
            {type:'list', items:[
              'Most crews rely on PDF floorplans or, at best, basic 3D layouts on tablets — nothing dynamic or real-time',
              'Fire alarm panels only communicate zone-level alerts, not precise or evolving hazard locations',
              'There is no live hazard tracking once a fire starts, so crews\' mental models go stale the moment they\'re wrong',
              'There is little to no cross-agency data sharing between Fire, EMS, and Police, creating coordination gaps at the exact moment coordination matters most'
            ]},
            {type:'p', text:'These insights directly shaped the intervention: rather than another static pre-incident plan viewer, SentryFlame needed to deliver live, sensor-driven building state, with a design built around the specific decisions firefighters make in the first minutes on scene — where\'s the fire, who\'s trapped, which exits are blocked, who needs help first.'},
            {type:'p', text:'Beyond the primary Fire/EMS/Police user group, the team identified adjacent stakeholders whose needs shaped the business model and go-to-market: commercial real estate owners, industrial facility managers, insurance companies, and property managers seeking risk reduction and operational continuity — all groups with dedicated safety/emergency-preparedness budgets.'}
          ]
        },
        {
          title:'Competitive/Market Analysis',
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
      role:'Product Designer & PM', timeline:'Q3 2023 — 12 wks', team:'2 design, 3 eng',
      skills:['Figma','SwiftUI','Kotlin'],
      awards:['Internal Design Award — Q3 2023'],
      links:[{label:'Prototype', url:'#'}],
      media:[
        {type:'image', src:'https://placehold.co/700x420/C89B3C/241D14?text=Mobile+Redesign+Screens', caption:'Before / after key screens'},
        {type:'video', src:'media/ex04-prototype-demo.mp4', poster:'https://placehold.co/700x420/8A6B2E/FBF5E6?text=Prototype+Walkthrough+%28Video%29', caption:'Prototype walkthrough'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'The mobile app had accreted five years of inconsistent UI patterns, hurting task completion and App Store ratings.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Led a full visual and interaction audit, rebuilt the core component library, and re-shipped the five highest-traffic flows first.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'App Store rating rose from 3.6 to 4.4 stars and core task completion improved by double digits.'}]}
      ]
    },
    ex05: {
      ticket:'EX-05', category:'Personal Project', title:'Growth Loop System',
      role:'Solo Builder', timeline:'2024 — 8 wks', team:'Solo',
      skills:['Python','Segment','SQL'],
      awards:[],
      links:[{label:'GitHub', url:'#'}],
      media:[
        {type:'diagram', src:'https://placehold.co/700x420/EAF1E3/241D14?text=Growth+Loop+Model', caption:'Referral loop coefficient model'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'Wanted to understand which referral mechanics actually compound versus which just look good in a single-touch dashboard.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Built a small event-tracking pipeline and simulator to model loop coefficients under different incentive structures.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'Produced a reusable framework for evaluating growth loops that I now apply when scoping new referral features.'}]}
      ]
    },
    ex06: {
      ticket:'EX-06', category:'Work Project', title:'Internal Analytics Suite',
      role:'Lead PM', timeline:'Q1 2024 — 16 wks', team:'4 eng, 1 design',
      skills:['Looker','dbt','BigQuery'],
      awards:[],
      links:[{label:'Live tool', url:'#'}],
      media:[
        {type:'image', src:'https://placehold.co/700x420/3F6E53/FBF5E6?text=Analytics+Suite+Dashboard', caption:'Self-serve Looker workspace'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'Every team had its own spreadsheet-based reporting, so metrics disagreed across leadership decks.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Consolidated source-of-truth models in dbt and shipped a self-serve Looker workspace with owned, documented metrics.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'Became the default reporting layer for three departments and eliminated recurring metric-reconciliation meetings.'}]}
      ]
    },
    ex07: {
      ticket:'EX-07', category:'Work Project', title:'Checkout Simplification',
      role:'Product Manager', timeline:'Q2 2024 — 9 wks', team:'2 eng',
      skills:['Stripe','React','A/B Testing'],
      awards:[],
      links:[],
      media:[
        {type:'diagram', src:'https://placehold.co/700x420/EAF1E3/241D14?text=Checkout+Flow+Before+%2F+After', caption:'Checkout steps reduced from 7 to 3'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'Checkout had grown to seven steps over time, with redundant fields carried over from a legacy payment provider.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Cut the flow to three steps, removed duplicate fields, and pre-filled known information for returning users.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'Checkout completion rate increased and support tickets related to checkout dropped significantly.'}]}
      ]
    },
    ex08: {
      ticket:'EX-08', category:'Work Project', title:'Notification Overhaul',
      role:'Product Manager', timeline:'Q3 2024 — 7 wks', team:'2 eng, 1 design',
      skills:['Firebase','Segment'],
      awards:[],
      links:[],
      media:[
        {type:'image', src:'https://placehold.co/700x420/D98B76/241D14?text=Notification+Settings+Screens', caption:'New notification tiering UI'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'Users were being over-notified with low-relevance alerts, driving up opt-out and uninstall rates.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Introduced notification tiers and user-level frequency capping, prioritized by predicted relevance.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'Notification opt-out rate dropped and engagement with the remaining notifications improved.'}]}
      ]
    },
    ex09: {
      ticket:'EX-09', category:'Capstone Project', title:'Partner Integration Platform',
      role:'Team Lead', timeline:'Sep 2025 — Apr 2026', team:'4 engineering students',
      skills:['Node.js','PostgreSQL','AWS'],
      awards:['1st Place, UBC Capstone Showcase'],
      links:[{label:'GitHub', url:'#'},{label:'Demo video', url:'#'}],
      media:[
        {type:'diagram', src:'https://placehold.co/700x420/EAF1E3/241D14?text=Platform+Architecture', caption:'Middleware + connector architecture'},
        {type:'video', src:'media/ex09-demo-video.mp4', poster:'https://placehold.co/700x420/5B1420/FBF5E6?text=Demo+Video', caption:'End-to-end platform demo'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'Small partner organizations lacked an affordable way to integrate with each other\'s systems without custom engineering work.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Led a four-person team to design and build a middleware platform with configurable connectors and a visual mapping tool.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'Delivered a working platform validated with two pilot partner organizations and awarded top capstone project.'}]}
      ]
    },
    ex10: {
      ticket:'EX-10', category:'Work Project', title:'Localization Rollout',
      role:'Product Manager', timeline:'Q4 2024 — 11 wks', team:'2 eng, 2 translators',
      skills:['i18next','Lokalise'],
      awards:[],
      links:[],
      media:[
        {type:'image', src:'https://placehold.co/700x420/C1965F/241D14?text=Localized+App+Screens', caption:'Localized UI across three markets'}
      ],
      sections:[
        {title:'Problem', blocks:[{type:'p', text:'The product was English-only, blocking expansion into three key non-English-speaking markets.'}]},
        {title:'Approach', blocks:[{type:'p', text:'Introduced an i18n framework, coordinated translation workflows, and rolled out locale support market by market.'}]},
        {title:'Outcome', blocks:[{type:'p', text:'Launched in three new markets with full localization, contributing to double-digit growth in those regions.'}]}
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
          const p = document.createElement('p');
          p.textContent = card.text;
          el.appendChild(h5);
          el.appendChild(p);
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
