// Skills as eight parts on the desk under the MCU board, two rows of four. Each part takes one jumper
// from a free left-side header pin (WireLayer routes them as one harness down the board's left edge).
// Geometry is in board units: the parts block shares the board's scale, x 0-1500 like the board.

export type SkillKind = 'dip8' | 'devboard' | 'dip28' | 'rf' | 'sbc' | 'logic' | 'probe' | 'gpu';

export type SkillGroup = {
  n: number;
  kind: SkillKind;
  // one-line plate text, the full name (tooltip) and the panel title
  label: string;
  name: string;
  // header pin the jumper leaves: selector for WireLayer, and the silkscreen it carries
  from: string;
  silk: string;
  color: string;
  skills: string[];
};

// Pin order is set so the harness never crosses: the lowest pin takes the innermost lane down the board's
// edge and the shallowest turn (U4, far right of the upper row); the highest pin takes the outer lane
// and the deepest turn (U5, near left of the lower row).
export const SKILLS: SkillGroup[] = [
  {
    n: 1, kind: 'dip8', label: 'LANGUAGES', name: 'Languages',
    from: "#hero-cn8 [data-pin='PA4']", silk: 'A2', color: '#c9a43a',
    skills: ['C', 'C++', 'Python', 'Bash', 'Assembly'],
  },
  {
    n: 2, kind: 'devboard', label: 'MCUs & BOARDS', name: 'MCUs & Boards',
    from: "#hero-cn8 [data-pin='PB0']", silk: 'A3', color: '#4f8a4f',
    skills: ['STM32', 'ESP32', 'MSP430', 'ATmega32', 'ARM Cortex-M', 'NXP MCXN947', 'NXP S32K', 'i.MX RT', 'Arduino Nano', 'Raspberry Pi'],
  },
  {
    n: 3, kind: 'dip28', label: 'FIRMWARE', name: 'Firmware',
    from: "#hero-cn8 [data-pin='PC1']", silk: 'A4', color: '#c77a33',
    skills: ['FreeRTOS', 'Zephyr', 'Interrupts', 'DMA', 'Timers', 'PWM', 'ADC', 'PID control', 'Bootloaders & OTA', 'TinyML (TFLite Micro)'],
  },
  {
    n: 4, kind: 'rf', label: 'BUSES & WIRELESS', name: 'Buses & Wireless',
    from: "#hero-cn8 [data-pin='PC0']", silk: 'A5', color: '#3f6fa8',
    skills: ['UART', 'SPI', 'I2C', 'CAN', 'USB', 'Ethernet', 'BLE', 'Wi-Fi', 'Zigbee', 'Thread', 'MQTT', 'Modbus'],
  },
  {
    n: 5, kind: 'sbc', label: 'EMBEDDED LINUX', name: 'Embedded Linux & Network',
    from: "#hero-cn7 [data-pin='PB7']", silk: 'PB7', color: '#6d5596',
    skills: [
      'Linux', 'OpenWrt', 'Yocto', 'POSIX', 'Device tree', 'Linux IIO', 'TCP/IP', 'UDP', 'DHCP', 'DNS', 'hostapd',
      'wpa_supplicant', 'nftables/iptables', 'tc/netem', 'VLANs', 'TLS / mbedTLS',
    ],
  },
  {
    n: 6, kind: 'logic', label: 'DEBUG', name: 'Debug & Validation',
    from: "#hero-cn7 [data-pin='PC13']", silk: 'PC13', color: '#7a5136',
    skills: [
      'GDB', 'Valgrind', 'ASan/UBSan', 'Ceedling', 'Unity', 'CMock', 'Wireshark', 'tcpdump', 'TLS handshake and MQTT traces',
      'Oscilloscope', 'Logic analyzer', 'HIL automation',
    ],
  },
  {
    n: 7, kind: 'probe', label: 'BUILD & TOOLS', name: 'Build, Tools & Cloud',
    from: "#hero-cn8 [data-pin='PA0']", silk: 'A0', color: '#7d7f84',
    skills: [
      'Git', 'GitHub Actions', 'Docker', 'CMake', 'Make', 'GCC (arm-none-eabi)', 'STM32CubeIDE', 'MCUXpresso', 'Keil', 'IAR',
      'CCS', 'LVGL', 'GUI Guider', 'Ghidra', 'QEMU', 'DECAF', 'AWS S3', 'Jira', 'Confluence',
    ],
  },
  {
    n: 8, kind: 'gpu', label: 'GPU & PARALLEL', name: 'GPU, Parallel & ML',
    from: "#hero-cn8 [data-pin='PA1']", silk: 'A1', color: '#cf4f8b',
    skills: ['CUDA', 'cuFFT', 'pthreads', 'Nsight', 'Shared memory', 'Coalesced access', 'Warp divergence', 'Occupancy', 'PyTorch', 'TorchHD', 'TensorFlow', 'OpenCV'],
  },
];

// Datasheet addressing: each group has an invented peripheral base, 0x1000 apart in group order, and
// its cells sit at a 4-byte stride from the first skill
export const baseOf = (n: number) => {
  const a = (0x4000_0000 + n * 0x1000).toString(16).toUpperCase().padStart(8, '0');
  return `0x${a.slice(0, 4)}_${a.slice(4)}`;
};
export const offsetOf = (i: number) => `0x${(i * 4).toString(16).toUpperCase().padStart(2, '0')}`;

// every part is drawn in one 320 x 200 frame; the jumper lands on PAD, on the part's top edge
export const FRAME = { w: 320, h: 200 };
export const PAD: Record<SkillKind, [number, number]> = {
  dip8: [72, 35],
  devboard: [62, 54],
  dip28: [34, 50],
  rf: [76, 21],
  sbc: [37, 25],
  logic: [70.5, 34.5],
  probe: [245.5, 83.5],
  gpu: [226, 30],
};

// the parts block, in board units from the top of the block, under the Register map heading. Rows sit below
// a channel each, where the harness turns in toward the parts; the heading sits above every channel.
// Parts and plates are drawn at a scale k over the board (set in CSS by aspect ratio, up to 1.3), and the
// grid runs right past the board's edge onto the free desk as k grows
export const GRID = { top: 120, channel: 112, gap: 50, inset: 25 };
export const PLATE = { dy: FRAME.h + 8, h: 40 };
