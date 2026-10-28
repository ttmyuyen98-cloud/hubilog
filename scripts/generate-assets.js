import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Visual definition for each asset according to Image Mapping specifications
const assets = [
  // S1: Home
  {
    filename: 's1_logo_brand_01.png',
    width: 600,
    height: 600,
    type: 'png',
    svg: `
      <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0A192F"/>
            <stop offset="100%" stop-color="#112240"/>
          </linearGradient>
          <radialGradient id="cyanCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#00E5FF" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- Square container with subtle border -->
        <rect width="600" height="600" rx="90" fill="url(#logoBg)"/>
        <rect x="15" y="15" width="570" height="570" rx="75" fill="none" stroke="#00E5FF" stroke-width="6" stroke-opacity="0.5"/>
        <circle cx="300" cy="300" r="230" fill="url(#cyanCenter)"/>
        
        <!-- Outer Glowing Ring -->
        <circle cx="300" cy="300" r="190" fill="#0A192F" stroke="#00E5FF" stroke-width="8" stroke-dasharray="16 8"/>
        
        <!-- Speed Accent Wings -->
        <line x1="80" y1="270" x2="160" y2="270" stroke="#00E5FF" stroke-width="10" stroke-linecap="round"/>
        <line x1="60" y1="300" x2="140" y2="300" stroke="#00E5FF" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
        <line x1="90" y1="330" x2="160" y2="330" stroke="#00E5FF" stroke-width="10" stroke-linecap="round" opacity="0.5"/>

        <line x1="520" y1="270" x2="440" y2="270" stroke="#F59E0B" stroke-width="10" stroke-linecap="round"/>
        <line x1="540" y1="300" x2="460" y2="300" stroke="#F59E0B" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
        <line x1="510" y1="330" x2="440" y2="330" stroke="#F59E0B" stroke-width="10" stroke-linecap="round" opacity="0.5"/>

        <!-- Core Diamond / Express Emblem -->
        <path d="M190 300 L300 190 L410 300 L300 410 Z" fill="none" stroke="#F59E0B" stroke-width="22" stroke-linejoin="round"/>
        <path d="M235 300 L300 235 L365 300 L300 365 Z" fill="#00E5FF"/>
        <circle cx="300" cy="300" r="26" fill="#FFFFFF"/>
        <circle cx="300" cy="300" r="12" fill="#0A192F"/>
      </svg>
    `
  },
  {
    filename: 's1_hero_delivery_01.jpg',
    width: 1280,
    height: 720,
    type: 'jpeg',
    svg: `
      <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0a1224"/>
            <stop offset="60%" stop-color="#101a30"/>
            <stop offset="100%" stop-color="#070B14"/>
          </linearGradient>
          <radialGradient id="cyanOrb" cx="30%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#00F0FF" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="orangeOrb" cx="80%" cy="70%" r="40%">
            <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#FF6B00" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1280" height="720" fill="url(#bgGrad)"/>
        <circle cx="384" cy="288" r="400" fill="url(#cyanOrb)"/>
        <circle cx="1024" cy="504" r="350" fill="url(#orangeOrb)"/>

        <!-- Grid Lines Pattern -->
        <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
          <line x1="0" y1="120" x2="1280" y2="120"/>
          <line x1="0" y1="240" x2="1280" y2="240"/>
          <line x1="0" y1="360" x2="1280" y2="360"/>
          <line x1="0" y1="480" x2="1280" y2="480"/>
          <line x1="0" y1="600" x2="1280" y2="600"/>
          <line x1="200" y1="0" x2="200" y2="720"/>
          <line x1="400" y1="0" x2="400" y2="720"/>
          <line x1="600" y1="0" x2="600" y2="720"/>
          <line x1="800" y1="0" x2="800" y2="720"/>
          <line x1="1000" y1="0" x2="1000" y2="720"/>
        </g>

        <!-- Modern Architectural City Silhouette / Residential Complex -->
        <path d="M 100 720 L 100 480 L 220 480 L 220 540 L 320 540 L 320 420 L 460 420 L 460 720 Z" fill="#0d1729" opacity="0.8"/>
        <path d="M 460 720 L 460 360 L 600 360 L 600 450 L 750 450 L 750 300 L 900 300 L 900 720 Z" fill="#131e36" opacity="0.9"/>
        <path d="M 880 720 L 880 390 L 1020 390 L 1020 480 L 1180 480 L 1180 720 Z" fill="#0d1729" opacity="0.8"/>

        <!-- Apartment Windows Lights -->
        <rect x="500" y="400" width="12" height="18" fill="#00F0FF" opacity="0.6"/>
        <rect x="540" y="400" width="12" height="18" fill="#FF6B00" opacity="0.6"/>
        <rect x="500" y="440" width="12" height="18" fill="#00F0FF" opacity="0.4"/>
        <rect x="780" y="340" width="14" height="20" fill="#00F0FF" opacity="0.7"/>
        <rect x="830" y="340" width="14" height="20" fill="#FFFFFF" opacity="0.5"/>
        <rect x="780" y="380" width="14" height="20" fill="#FF6B00" opacity="0.5"/>
        <rect x="830" y="380" width="14" height="20" fill="#00F0FF" opacity="0.5"/>

        <!-- Courier Character Representation / Vehicle / Delivery Pod -->
        <g transform="translate(680, 220)">
          <!-- Glass Card Overlay for Shipper Focus -->
          <rect x="-40" y="-40" width="560" height="480" rx="24" fill="#101726" fill-opacity="0.85" stroke="#00F0FF" stroke-width="2"/>
          
          <!-- Route Network graphics -->
          <circle cx="120" cy="180" r="16" fill="#00F0FF"/>
          <circle cx="280" cy="120" r="20" fill="#FF6B00"/>
          <circle cx="400" cy="220" r="14" fill="#00F0FF"/>
          <path d="M120 180 Q 200 100 280 120 T 400 220" fill="none" stroke="#00F0FF" stroke-width="5" stroke-dasharray="10 6"/>
          
          <!-- Smart Delivery Box with HUBI logo -->
          <rect x="180" y="240" width="180" height="140" rx="16" fill="#192338" stroke="#FF6B00" stroke-width="3"/>
          <rect x="180" y="280" width="180" height="8" fill="#FF6B00"/>
          <circle cx="270" cy="310" r="28" fill="#070B14" stroke="#00F0FF" stroke-width="3"/>
          <text x="270" y="318" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="22" font-weight="800" fill="#FFFFFF" text-anchor="middle">H</text>
          
          <text x="240" y="70" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">HUBI SMART DISPATCH</text>
          <text x="240" y="100" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" font-weight="500" fill="#94A3B8" text-anchor="middle">Giao Hàng Đúng Giờ • Tối Ưu Nội Khu</text>
        </g>
      </svg>
    `
  },
  {
    filename: 's1_icon_group_01.png',
    width: 256,
    height: 256,
    type: 'png',
    svg: `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="28" fill="#101726" stroke="#00F0FF" stroke-width="2" stroke-opacity="0.3"/>
        <circle cx="128" cy="128" r="70" fill="none" stroke="#00F0FF" stroke-width="4" stroke-dasharray="8 6"/>
        <!-- Central Hub Node -->
        <circle cx="128" cy="128" r="24" fill="#FF6B00"/>
        <path d="M120 128 L126 134 L138 122" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        <!-- Surrounding Order Nodes -->
        <circle cx="80" cy="90" r="14" fill="#00F0FF"/>
        <line x1="88" y1="98" x2="114" y2="116" stroke="#00F0FF" stroke-width="2"/>
        <circle cx="176" cy="90" r="14" fill="#00F0FF"/>
        <line x1="168" y1="98" x2="142" y2="116" stroke="#00F0FF" stroke-width="2"/>
        <circle cx="128" cy="186" r="14" fill="#00F0FF"/>
        <line x1="128" y1="172" x2="128" y2="152" stroke="#00F0FF" stroke-width="2"/>
      </svg>
    `
  },
  {
    filename: 's1_icon_time_02.png',
    width: 256,
    height: 256,
    type: 'png',
    svg: `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="28" fill="#101726" stroke="#FF6B00" stroke-width="2" stroke-opacity="0.3"/>
        <circle cx="128" cy="128" r="64" fill="none" stroke="#FF6B00" stroke-width="6"/>
        <!-- Clock hands -->
        <circle cx="128" cy="128" r="8" fill="#00F0FF"/>
        <line x1="128" y1="128" x2="128" y2="86" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
        <line x1="128" y1="128" x2="162" y2="128" stroke="#00F0FF" stroke-width="5" stroke-linecap="round"/>
        <!-- Time Slots tick marks -->
        <circle cx="128" cy="74" r="4" fill="#00F0FF"/>
        <circle cx="182" cy="128" r="4" fill="#00F0FF"/>
        <circle cx="128" cy="182" r="4" fill="#00F0FF"/>
        <circle cx="74" cy="128" r="4" fill="#00F0FF"/>
      </svg>
    `
  },
  {
    filename: 's1_icon_saving_03.png',
    width: 256,
    height: 256,
    type: 'png',
    svg: `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="28" fill="#101726" stroke="#00F0FF" stroke-width="2" stroke-opacity="0.3"/>
        <!-- Shield / Wallet / Percent Discount -->
        <path d="M128 60 L180 84 V136 C180 170 148 196 128 204 C108 196 76 170 76 136 V84 Z" fill="none" stroke="#00F0FF" stroke-width="5"/>
        <text x="128" y="146" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="44" font-weight="800" fill="#FF6B00" text-anchor="middle">%</text>
      </svg>
    `
  },

  // S2: About Us
  {
    filename: 's2_problem_isolated_01.jpg',
    width: 800,
    height: 1000,
    type: 'jpeg',
    svg: `
      <svg width="800" height="1000" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="1000" fill="#0a0f1d"/>
        <rect x="40" y="40" width="720" height="920" rx="20" fill="#101726" stroke="rgba(255,255,255,0.08)"/>
        
        <!-- Chaotic isolated packages illustration -->
        <circle cx="400" cy="380" r="260" fill="none" stroke="rgba(255,107,0,0.15)" stroke-width="2" stroke-dasharray="8 8"/>
        
        <!-- Package 1 -->
        <g transform="translate(180, 260) rotate(-15)">
          <rect width="140" height="110" rx="10" fill="#1b2438" stroke="#FF6B00" stroke-width="2"/>
          <line x1="20" y1="55" x2="120" y2="55" stroke="#FF6B00" stroke-width="2" stroke-dasharray="4"/>
          <text x="70" y="65" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">Đơn lẻ A</text>
          <text x="70" y="90" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#FF6B00" text-anchor="middle">35.000đ</text>
        </g>
        
        <!-- Package 2 -->
        <g transform="translate(440, 220) rotate(12)">
          <rect width="130" height="100" rx="10" fill="#1b2438" stroke="#FF6B00" stroke-width="2"/>
          <line x1="15" y1="50" x2="115" y2="50" stroke="#FF6B00" stroke-width="2" stroke-dasharray="4"/>
          <text x="65" y="60" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">Đơn lẻ B</text>
          <text x="65" y="85" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#FF6B00" text-anchor="middle">40.000đ</text>
        </g>

        <!-- Package 3 -->
        <g transform="translate(280, 440) rotate(-5)">
          <rect width="150" height="120" rx="10" fill="#1b2438" stroke="#FF6B00" stroke-width="2"/>
          <text x="75" y="65" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">Đơn lẻ C</text>
          <text x="75" y="95" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#FF6B00" text-anchor="middle">35.000đ</text>
        </g>

        <!-- Warning badge -->
        <rect x="250" y="640" width="300" height="60" rx="30" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="2"/>
        <text x="400" y="678" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FF6B00" text-anchor="middle">VẤN ĐỀ VẬN HÀNH</text>
        <text x="400" y="740" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle" font-weight="600">Phí ship cao gấp 3 lần do đơn lẻ</text>
        <text x="400" y="780" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="15" fill="#94A3B8" text-anchor="middle">Shipper giao phân tán, giờ giấc bị động</text>
      </svg>
    `
  },
  {
    filename: 's2_solution_hubi_02.jpg',
    width: 800,
    height: 1000,
    type: 'jpeg',
    svg: `
      <svg width="800" height="1000" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="1000" fill="#070B14"/>
        <rect x="40" y="40" width="720" height="920" rx="20" fill="#101726" stroke="#00F0FF" stroke-width="1.5"/>
        
        <!-- Optimized Route Hub diagram -->
        <circle cx="400" cy="380" r="240" fill="none" stroke="rgba(0,240,255,0.15)" stroke-width="2"/>
        <circle cx="400" cy="380" r="160" fill="none" stroke="rgba(0,240,255,0.3)" stroke-width="2"/>
        
        <!-- Central HUBI Distribution node -->
        <circle cx="400" cy="380" r="54" fill="#00F0FF" filter="drop-shadow(0 0 20px #00F0FF)"/>
        <circle cx="400" cy="380" r="46" fill="#070B14"/>
        <text x="400" y="388" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="24" font-weight="800" fill="#00F0FF" text-anchor="middle">HUBI</text>

        <!-- Inbound streamlined arrows -->
        <g stroke="#00F0FF" stroke-width="4" stroke-linecap="round">
          <line x1="220" y1="220" x2="350" y2="340"/>
          <line x1="580" y1="220" x2="450" y2="340"/>
          <line x1="220" y1="540" x2="350" y2="420"/>
          <line x1="580" y1="540" x2="450" y2="420"/>
        </g>
        
        <!-- Scheduled Fixed Batch Tag -->
        <rect x="250" y="640" width="300" height="60" rx="30" fill="rgba(0,240,255,0.15)" stroke="#00F0FF" stroke-width="2"/>
        <text x="400" y="678" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#00F0FF" text-anchor="middle">GIẢI PHÁP HUBI</text>
        <text x="400" y="740" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle" font-weight="600">Gom đơn nội khu theo khung giờ</text>
        <text x="400" y="780" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="15" fill="#94A3B8" text-anchor="middle">Tối ưu tuyến đường, giảm ngay 60% chi phí</text>
      </svg>
    `
  },
  {
    filename: 's2_team_members_03.jpg',
    width: 1280,
    height: 720,
    type: 'jpeg',
    svg: `
      <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
        <rect width="1280" height="720" fill="#0A192F"/>
        <rect x="60" y="40" width="1160" height="640" rx="24" fill="#112240" stroke="#00E5FF" stroke-width="2" stroke-opacity="0.3"/>
        
        <text x="640" y="105" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="32" font-weight="800" fill="#E6F1FF" text-anchor="middle">ĐỘI NGŨ DỰ ÁN HUBI LOGISTICS</text>
        <text x="640" y="145" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#8892B0" text-anchor="middle">Giải pháp gom đơn giao nội khu theo giờ tối ưu chi phí và hành trình</text>
        
        <!-- 3 Team member cards -->
        <!-- Member 1: Trần Thị Mỹ Uyên -->
        <g transform="translate(130, 190)">
          <rect width="300" height="440" rx="20" fill="#0A192F" stroke="#00E5FF" stroke-width="2"/>
          <circle cx="150" cy="100" r="60" fill="#112240" stroke="#00E5FF" stroke-width="3"/>
          <text x="150" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="28" font-weight="800" fill="#00E5FF" text-anchor="middle">UYÊN</text>
          <text x="150" y="210" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#E6F1FF" text-anchor="middle">Trần Thị Mỹ Uyên</text>
          <text x="150" y="245" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" font-weight="600" fill="#F59E0B" text-anchor="middle">FOUNDER &amp; PRODUCT LEAD</text>
          <text x="150" y="285" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="12" fill="#8892B0" text-anchor="middle">ttmyuyen98@gmail.com</text>
          <text x="150" y="335" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" fill="#CCD6F6" text-anchor="middle">Định hướng chiến lược &amp; UX</text>
        </g>

        <!-- Member 2: Nguyễn Thị Thanh Hương -->
        <g transform="translate(490, 190)">
          <rect width="300" height="440" rx="20" fill="#0A192F" stroke="#F59E0B" stroke-width="2"/>
          <circle cx="150" cy="100" r="60" fill="#112240" stroke="#F59E0B" stroke-width="3"/>
          <text x="150" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="24" font-weight="800" fill="#F59E0B" text-anchor="middle">HƯƠNG</text>
          <text x="150" y="210" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#E6F1FF" text-anchor="middle">Nguyễn Thị Thanh Hương</text>
          <text x="150" y="245" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" font-weight="600" fill="#00E5FF" text-anchor="middle">LOGISTICS &amp; OPERATIONS</text>
          <text x="150" y="285" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="12" fill="#8892B0" text-anchor="middle">huong.nguyen@hubilogistics.vn</text>
          <text x="150" y="335" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" fill="#CCD6F6" text-anchor="middle">Điều phối tuyến &amp; giao nhận</text>
        </g>

        <!-- Member 3: Đỗ Thị Lan Anh -->
        <g transform="translate(850, 190)">
          <rect width="300" height="440" rx="20" fill="#0A192F" stroke="#00E5FF" stroke-width="2"/>
          <circle cx="150" cy="100" r="60" fill="#112240" stroke="#00E5FF" stroke-width="3"/>
          <text x="150" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="22" font-weight="800" fill="#00E5FF" text-anchor="middle">LAN ANH</text>
          <text x="150" y="210" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#E6F1FF" text-anchor="middle">Đỗ Thị Lan Anh</text>
          <text x="150" y="245" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" font-weight="600" fill="#F59E0B" text-anchor="middle">SYSTEM &amp; DATA ADMIN</text>
          <text x="150" y="285" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="12" fill="#8892B0" text-anchor="middle">lananh.do@hubilogistics.vn</text>
          <text x="150" y="335" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" fill="#CCD6F6" text-anchor="middle">Kiến trúc hệ thống &amp; dữ liệu</text>
        </g>
      </svg>
    `
  },

  // S3: Services
  {
    filename: 's3_service_main_01.jpg',
    width: 800,
    height: 1000,
    type: 'jpeg',
    svg: `
      <svg width="800" height="1000" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="1000" fill="#09101f"/>
        <rect x="30" y="30" width="740" height="940" rx="24" fill="#101726" stroke="#00F0FF" stroke-width="2"/>
        
        <!-- Delivery at apartment reception lobby -->
        <rect x="80" y="100" width="640" height="400" rx="16" fill="#162238"/>
        <!-- Reception counter & modern architecture -->
        <rect x="120" y="320" width="560" height="140" fill="#1d2c47" rx="8"/>
        <text x="400" y="280" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle">HUBI CONCIERGE HUB</text>
        <text x="400" y="315" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" fill="#00F0FF" text-anchor="middle">Điểm Giao Nhận Nội Khu Sảnh Chung Cư</text>
        
        <!-- Live status bar -->
        <rect x="120" y="540" width="560" height="100" rx="16" fill="#192338" stroke="rgba(255,255,255,0.08)"/>
        <text x="160" y="585" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FF6B00">Khung giờ vàng sáng:</text>
        <text x="420" y="585" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="600" fill="#FFFFFF">08:00 - 09:30 (Đúng hẹn 99.8%)</text>
        <text x="160" y="618" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#00F0FF">Khung giờ vàng chiều:</text>
        <text x="420" y="618" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="600" fill="#FFFFFF">17:30 - 19:30 (Cư dân về nhà)</text>

        <!-- Metrics pills -->
        <g transform="translate(120, 680)">
          <rect width="260" height="160" rx="16" fill="#192338" stroke="#00F0FF" stroke-width="1.5"/>
          <text x="130" y="65" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="44" font-weight="800" fill="#00F0FF" text-anchor="middle">-60%</text>
          <text x="130" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="15" fill="#94A3B8" text-anchor="middle">Chi phí so với ship riêng lẻ</text>
        </g>
        <g transform="translate(420, 680)">
          <rect width="260" height="160" rx="16" fill="#192338" stroke="#FF6B00" stroke-width="1.5"/>
          <text x="130" y="65" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="44" font-weight="800" fill="#FF6B00" text-anchor="middle">100%</text>
          <text x="130" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="15" fill="#94A3B8" text-anchor="middle">Đúng khung giờ đặt trước</text>
        </g>
      </svg>
    `
  },
  {
    filename: 's3_target_apartment_02.jpg',
    width: 500,
    height: 500,
    type: 'jpeg',
    svg: `
      <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="#09101d"/>
        <rect x="20" y="20" width="460" height="460" rx="20" fill="#101726" stroke="#00F0FF" stroke-width="1.5"/>
        <circle cx="250" cy="180" r="80" fill="#192338" stroke="#00F0FF" stroke-width="3"/>
        <path d="M220 220 L220 160 L280 160 L280 220 Z" fill="#00F0FF" opacity="0.3"/>
        <polygon points="250,120 210,160 290,160" fill="#FF6B00"/>
        <text x="250" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" text-anchor="middle">CƯ DÂN CHUNG CƯ</text>
        <text x="250" y="360" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">Nhận kiện hàng đúng khi tan sở</text>
        <text x="250" y="390" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#00F0FF" font-weight="600" text-anchor="middle">Không còn cảnh chờ shipper gọi</text>
      </svg>
    `
  },
  {
    filename: 's3_target_shop_03.jpg',
    width: 500,
    height: 500,
    type: 'jpeg',
    svg: `
      <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="#09101d"/>
        <rect x="20" y="20" width="460" height="460" rx="20" fill="#101726" stroke="#FF6B00" stroke-width="1.5"/>
        <circle cx="250" cy="180" r="80" fill="#192338" stroke="#FF6B00" stroke-width="3"/>
        <path d="M210 160 H290 V220 H210 Z" fill="#FF6B00" opacity="0.3"/>
        <path d="M200 160 L250 130 L300 160" fill="none" stroke="#00F0FF" stroke-width="4"/>
        <text x="250" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" text-anchor="middle">SHOP NỘI KHU &amp; ONLINE</text>
        <text x="250" y="360" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">Đóng hàng theo ca, gom 1 lần</text>
        <text x="250" y="390" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#FF6B00" font-weight="600" text-anchor="middle">Tiết kiệm 40% chi phí chuyển phát</text>
      </svg>
    `
  },
  {
    filename: 's3_process_flow_04.png',
    width: 1200,
    height: 400,
    type: 'png',
    svg: `
      <svg width="1200" height="400" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="400" rx="24" fill="#070B14" stroke="rgba(255,255,255,0.08)"/>
        
        <!-- Flow line -->
        <line x1="160" y1="160" x2="1040" y2="160" stroke="#00F0FF" stroke-width="4" stroke-dasharray="8 8"/>
        
        <!-- Step 1 -->
        <g transform="translate(160, 160)">
          <circle cx="0" cy="0" r="44" fill="#101726" stroke="#00F0FF" stroke-width="3"/>
          <text x="0" y="8" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="24" font-weight="800" fill="#00F0FF" text-anchor="middle">01</text>
          <text x="0" y="80" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Đặt Lịch</text>
          <text x="0" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">Chọn điểm &amp; giờ</text>
        </g>

        <!-- Step 2 -->
        <g transform="translate(440, 160)">
          <circle cx="0" cy="0" r="44" fill="#101726" stroke="#FF6B00" stroke-width="3"/>
          <text x="0" y="8" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="24" font-weight="800" fill="#FF6B00" text-anchor="middle">02</text>
          <text x="0" y="80" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Gom Đơn</text>
          <text x="0" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">Tập hợp đơn cùng khu</text>
        </g>

        <!-- Step 3 -->
        <g transform="translate(740, 160)">
          <circle cx="0" cy="0" r="44" fill="#101726" stroke="#00F0FF" stroke-width="3"/>
          <text x="0" y="8" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="24" font-weight="800" fill="#00F0FF" text-anchor="middle">03</text>
          <text x="0" y="80" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Phân Tuyến</text>
          <text x="0" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">Tối ưu cung đường</text>
        </g>

        <!-- Step 4 -->
        <g transform="translate(1040, 160)">
          <circle cx="0" cy="0" r="44" fill="#101726" stroke="#FF6B00" stroke-width="3"/>
          <text x="0" y="8" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="24" font-weight="800" fill="#FF6B00" text-anchor="middle">04</text>
          <text x="0" y="80" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Giao Hàng</text>
          <text x="0" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">Chuẩn xác tận cửa</text>
        </g>
      </svg>
    `
  },

  // S4: Blog
  {
    filename: 's4_thumb_solution_01.jpg',
    width: 800,
    height: 450,
    type: 'jpeg',
    svg: `
      <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#0c1426"/>
        <rect x="20" y="20" width="760" height="410" rx="16" fill="#101726" stroke="#00F0FF" stroke-width="1.5"/>
        <circle cx="400" cy="180" r="90" fill="#192338" stroke="#00F0FF" stroke-width="3"/>
        <polygon points="400,120 440,160 420,160 420,230 380,230 380,160 360,160" fill="#00F0FF"/>
        <text x="400" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">GIAO HÀNG THÔNG MINH</text>
        <text x="400" y="360" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#00F0FF" text-anchor="middle">Mô hình gom đơn công nghệ cao</text>
      </svg>
    `
  },
  {
    filename: 's4_thumb_cost_02.jpg',
    width: 800,
    height: 450,
    type: 'jpeg',
    svg: `
      <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#0c1426"/>
        <rect x="20" y="20" width="760" height="410" rx="16" fill="#101726" stroke="#FF6B00" stroke-width="1.5"/>
        <circle cx="400" cy="180" r="90" fill="#192338" stroke="#FF6B00" stroke-width="3"/>
        <text x="400" y="205" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="70" font-weight="800" fill="#FF6B00" text-anchor="middle">₫</text>
        <text x="400" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">TIẾT KIỆM CHI PHÍ 60%</text>
        <text x="400" y="360" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#FF6B00" text-anchor="middle">Cách thức gom đơn sinh lời kép</text>
      </svg>
    `
  },
  {
    filename: 's4_thumb_trend_03.jpg',
    width: 800,
    height: 450,
    type: 'jpeg',
    svg: `
      <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#0c1426"/>
        <rect x="20" y="20" width="760" height="410" rx="16" fill="#101726" stroke="#00F0FF" stroke-width="1.5"/>
        <path d="M260 250 L350 180 L440 220 L540 120" fill="none" stroke="#00F0FF" stroke-width="6" stroke-linecap="round"/>
        <circle cx="540" cy="120" r="10" fill="#FF6B00"/>
        <text x="400" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">LOGISTICS CHẶNG CUỐI</text>
        <text x="400" y="360" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#00F0FF" text-anchor="middle">Đón đầu xu thế siêu đô thị</text>
      </svg>
    `
  },
  {
    filename: 's4_thumb_guide_04.jpg',
    width: 800,
    height: 450,
    type: 'jpeg',
    svg: `
      <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#0c1426"/>
        <rect x="20" y="20" width="760" height="410" rx="16" fill="#101726" stroke="#FF6B00" stroke-width="1.5"/>
        <rect x="330" y="90" width="140" height="180" rx="14" fill="#192338" stroke="#00F0FF" stroke-width="3"/>
        <line x1="360" y1="130" x2="440" y2="130" stroke="#FF6B00" stroke-width="4" stroke-linecap="round"/>
        <line x1="360" y1="160" x2="440" y2="160" stroke="#00F0FF" stroke-width="4" stroke-linecap="round"/>
        <line x1="360" y1="190" x2="410" y2="190" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
        <text x="400" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">HƯỚNG DẪN DỊCH VỤ</text>
        <text x="400" y="360" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">3 bước đặt lịch siêu tốc trên HUBI</text>
      </svg>
    `
  },

  // S5: Contact
  {
    filename: 's5_support_background_01.jpg',
    width: 800,
    height: 1000,
    type: 'jpeg',
    svg: `
      <svg width="800" height="1000" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#070B14"/>
            <stop offset="50%" stop-color="#0f192e"/>
            <stop offset="100%" stop-color="#070B14"/>
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill="url(#contactGrad)"/>
        <!-- Cybernetic Grid network -->
        <g stroke="rgba(0,240,255,0.12)" stroke-width="1.5">
          <circle cx="400" cy="400" r="100"/>
          <circle cx="400" cy="400" r="220"/>
          <circle cx="400" cy="400" r="340"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="400" y1="0" x2="400" y2="1000"/>
        </g>
        <circle cx="400" cy="400" r="40" fill="#00F0FF" opacity="0.3"/>
        <circle cx="400" cy="400" r="15" fill="#00F0FF"/>
        <text x="400" y="520" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="30" font-weight="800" fill="#FFFFFF" text-anchor="middle">HUBI DISPATCH DESK</text>
        <text x="400" y="560" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" fill="#00F0FF" text-anchor="middle">Hỗ trợ &amp; Điều phối vận hành 24/7</text>
      </svg>
    `
  },
  {
    filename: 's5_icon_email_02.png',
    width: 256,
    height: 256,
    type: 'png',
    svg: `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="28" fill="#101726" stroke="#00F0FF" stroke-width="2"/>
        <rect x="48" y="70" width="160" height="116" rx="14" fill="#192338" stroke="#00F0FF" stroke-width="3"/>
        <polyline points="52,74 128,136 204,74" fill="none" stroke="#FF6B00" stroke-width="4"/>
      </svg>
    `
  },
  {
    filename: 's5_shield_security_03.png',
    width: 256,
    height: 256,
    type: 'png',
    svg: `
      <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="28" fill="#101726" stroke="#00F0FF" stroke-width="2"/>
        <path d="M128 48 L192 76 V134 C192 178 156 210 128 220 C100 210 64 178 64 134 V76 Z" fill="#192338" stroke="#00F0FF" stroke-width="4"/>
        <path d="M104 132 L120 148 L154 114" fill="none" stroke="#FF6B00" stroke-width="5" stroke-linecap="round"/>
      </svg>
    `
  },

  // S6: Design & UX
  {
    filename: 's6_mockup_desktop_01.png',
    width: 1280,
    height: 720,
    type: 'png',
    svg: `
      <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
        <rect width="1280" height="720" fill="#070B14"/>
        <!-- Desktop Browser Frame -->
        <rect x="60" y="40" width="1160" height="640" rx="16" fill="#101726" stroke="#00F0FF" stroke-width="2"/>
        <!-- Window title bar -->
        <rect x="60" y="40" width="1160" height="44" rx="16" fill="#192338"/>
        <circle cx="95" cy="62" r="7" fill="#FF6B00"/>
        <circle cx="120" cy="62" r="7" fill="#00F0FF"/>
        <circle cx="145" cy="62" r="7" fill="#4ade80"/>
        <rect x="360" y="50" width="560" height="24" rx="12" fill="#070B14"/>
        <text x="640" y="67" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="13" fill="#94A3B8" text-anchor="middle">https://hubilogistics.vn</text>

        <!-- Interior Website Mockup View -->
        <rect x="100" y="120" width="500" height="32" rx="4" fill="#00F0FF" opacity="0.8"/>
        <rect x="100" y="170" width="440" height="80" rx="8" fill="#FFFFFF" opacity="0.9"/>
        <rect x="100" y="270" width="380" height="40" rx="6" fill="#94A3B8" opacity="0.4"/>
        <!-- CTA button on mockup -->
        <rect x="100" y="340" width="220" height="54" rx="10" fill="#FF6B00"/>
        <text x="210" y="374" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">ĐẶT LỊCH NGAY</text>
        <!-- Mockup illustration on right -->
        <rect x="660" y="120" width="500" height="360" rx="16" fill="#192338" stroke="rgba(255,255,255,0.1)"/>
        <circle cx="910" cy="300" r="90" fill="#00F0FF" opacity="0.2"/>
        <text x="910" y="310" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="28" font-weight="800" fill="#00F0FF" text-anchor="middle">HUBI PLATFORM</text>
        
        <!-- Mockup footer metrics -->
        <rect x="100" y="520" width="1060" height="120" rx="12" fill="#141c2e"/>
        <text x="640" y="585" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle">Giao Diện Desktop Tối Ưu Màn Hình Rộng 1440px</text>
      </svg>
    `
  },
  {
    filename: 's6_mockup_mobile_02.png',
    width: 540,
    height: 960,
    type: 'png',
    svg: `
      <svg width="540" height="960" viewBox="0 0 540 960" xmlns="http://www.w3.org/2000/svg">
        <rect width="540" height="960" fill="#070B14"/>
        <!-- Smartphone Frame -->
        <rect x="40" y="30" width="460" height="900" rx="40" fill="#101726" stroke="#00F0FF" stroke-width="3"/>
        <!-- Phone Speaker Notch -->
        <rect x="210" y="50" width="120" height="18" rx="9" fill="#070B14"/>
        
        <!-- Mobile App Header -->
        <rect x="60" y="90" width="420" height="60" fill="#192338"/>
        <text x="90" y="128" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">HUBI</text>
        <circle cx="430" cy="120" r="14" fill="#00F0FF"/>

        <!-- Mobile Hero -->
        <text x="80" y="220" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="30" font-weight="800" fill="#FFFFFF">NHẬN ĐÚNG GIỜ</text>
        <text x="80" y="260" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="30" font-weight="800" fill="#FF6B00">PHÍ SIÊU HỜI</text>
        <text x="80" y="305" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8">Gom đơn nội khu theo khung giờ vàng</text>

        <!-- Mobile CTA button -->
        <rect x="80" y="340" width="380" height="60" rx="12" fill="#FF6B00"/>
        <text x="270" y="378" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">ĐẶT LỊCH NGAY</text>

        <!-- Mobile Bento cards -->
        <rect x="80" y="440" width="380" height="120" rx="16" fill="#192338" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="130" cy="500" r="28" fill="#00F0FF" opacity="0.2"/>
        <text x="180" y="495" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">Gom Đơn Nội Khu</text>
        <text x="180" y="525" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8">Tiết kiệm chi phí vượt trội</text>

        <rect x="80" y="580" width="380" height="120" rx="16" fill="#192338" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="130" cy="640" r="28" fill="#FF6B00" opacity="0.2"/>
        <text x="180" y="635" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">Giao Đúng Khung Giờ</text>
        <text x="180" y="665" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8">Không trễ một phút</text>

        <!-- Bottom Home Indicator -->
        <rect x="200" y="900" width="140" height="6" rx="3" fill="#FFFFFF" opacity="0.5"/>
      </svg>
    `
  },
  {
    filename: 's6_palette_preview_03.png',
    width: 1280,
    height: 720,
    type: 'png',
    svg: `
      <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
        <rect width="1280" height="720" fill="#070B14"/>
        <rect x="40" y="40" width="1200" height="640" rx="20" fill="#101726" stroke="#00F0FF" stroke-width="1.5"/>
        <text x="640" y="100" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="32" font-weight="800" fill="#FFFFFF" text-anchor="middle">HỆ THỐNG MÃ MÀU &amp; TYPOGRAPHY CHUẨN</text>
        
        <!-- Palette Swatches (60 - 30 - 10) -->
        <!-- 60% Navy -->
        <g transform="translate(100, 150)">
          <rect width="240" height="260" rx="16" fill="#070B14" stroke="#FFFFFF" stroke-width="2"/>
          <text x="120" y="180" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Deep Navy (60%)</text>
          <text x="120" y="215" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">#070B14</text>
        </g>
        <!-- 30% Surface -->
        <g transform="translate(380, 150)">
          <rect width="240" height="260" rx="16" fill="#101726" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          <text x="120" y="180" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Surface (30%)</text>
          <text x="120" y="215" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">#101726</text>
        </g>
        <!-- 10% Cyan -->
        <g transform="translate(660, 150)">
          <rect width="240" height="260" rx="16" fill="#00F0FF"/>
          <text x="120" y="180" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#070B14" text-anchor="middle">Tech Cyan</text>
          <text x="120" y="215" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#070B14" text-anchor="middle">#00F0FF</text>
        </g>
        <!-- 10% Orange -->
        <g transform="translate(940, 150)">
          <rect width="240" height="260" rx="16" fill="#FF6B00"/>
          <text x="120" y="180" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Action Orange</text>
          <text x="120" y="215" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" fill="#FFFFFF" text-anchor="middle">#FF6B00</text>
        </g>

        <!-- Typography preview -->
        <g transform="translate(100, 460)">
          <rect width="1080" height="180" rx="16" fill="#192338" stroke="rgba(255,255,255,0.08)"/>
          <text x="50" y="60" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="28" font-weight="800" fill="#FFFFFF">Font Display: Syne (700 / 800) - Tạp Chí Số &amp; Sang Trọng</text>
          <text x="50" y="110" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="500" fill="#94A3B8">Font Body: Plus Jakarta Sans (400 / 500 / 600) - Độ Đọc Rõ Nét Chuẩn Tiếng Việt</text>
          <text x="50" y="150" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="16" font-weight="600" fill="#00F0FF">Borders: 20px Bento Card Radius • 10px Button Radius • Cyber Glow Effects</text>
        </g>
      </svg>
    `
  },
  {
    filename: 's6_popup_booking_04.png',
    width: 800,
    height: 600,
    type: 'png',
    svg: `
      <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#070B14"/>
        <rect x="60" y="40" width="680" height="520" rx="20" fill="#101726" stroke="#00F0FF" stroke-width="2"/>
        
        <text x="400" y="95" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" text-anchor="middle">BIỂU MẪU ĐẶT LỊCH NGAY</text>
        <text x="400" y="125" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="15" fill="#94A3B8" text-anchor="middle">Mô phỏng trải nghiệm người dùng cao cấp</text>

        <!-- Form fields preview -->
        <rect x="120" y="160" width="560" height="48" rx="10" fill="#192338" stroke="rgba(255,255,255,0.1)"/>
        <text x="140" y="190" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8">Họ và tên người đặt: Nguyễn Văn A</text>

        <rect x="120" y="225" width="270" height="48" rx="10" fill="#192338" stroke="rgba(255,255,255,0.1)"/>
        <text x="140" y="255" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8">Điểm nhận: Tòa S2.03</text>

        <rect x="410" y="225" width="270" height="48" rx="10" fill="#192338" stroke="rgba(255,255,255,0.1)"/>
        <text x="430" y="255" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#94A3B8">Điểm giao: Sảnh S1.08</text>

        <rect x="120" y="290" width="560" height="48" rx="10" fill="#192338" stroke="#00F0FF" stroke-width="1.5"/>
        <text x="140" y="320" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="14" fill="#00F0FF" font-weight="600">Khung giờ gom: 17:30 - 18:30 (Đợt chiều)</text>

        <!-- Success Toast preview -->
        <rect x="120" y="360" width="560" height="60" rx="12" fill="rgba(0,240,255,0.1)" stroke="#00F0FF"/>
        <text x="400" y="396" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#00F0FF" text-anchor="middle">✓ Đã xác nhận lịch hẹn mô phỏng thành công!</text>

        <!-- Submit button -->
        <rect x="120" y="445" width="560" height="54" rx="10" fill="#FF6B00"/>
        <text x="400" y="478" font-family="'Noto Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">XÁC NHẬN ĐẶT LỊCH GIAO HÀNG</text>
      </svg>
    `
  }
];

async function generateAll() {
  console.log(`Starting generation of ${assets.length} mapped visual assets...`);
  for (const item of assets) {
    const dest = path.join(assetsDir, item.filename);
    const svgBuffer = Buffer.from(item.svg);
    if (item.type === 'jpeg') {
      await sharp(svgBuffer)
        .jpeg({ quality: 90 })
        .toFile(dest);
    } else {
      await sharp(svgBuffer)
        .png({ compressionLevel: 8 })
        .toFile(dest);
    }
    console.log(`✓ Generated ${item.filename} (${item.width}x${item.height})`);
  }
  console.log('All 23 assets generated successfully into public/assets/!');
}

generateAll().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
