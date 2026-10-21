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
    from: "#hero-cn8 [data-pin='PA1']", silk: 'A1', color: '#d9d6cf',
    skills: ['CUDA', 'cuFFT', 'pthreads', 'Nsight', 'Shared memory', 'Coalesced access', 'Warp divergence', 'Occupancy', 'PyTorch', 'TorchHD', 'TensorFlow', 'OpenCV'],
  },
];

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

// the parts block, in board units from the top of the block: it tucks under the board's lower edge.
// Rows sit below a channel each, where the harness turns in toward the parts
export const BLOCK = { lift: 130, h: 728 };
export const SLOT_W = 375;
export const ROW_Y = [120, 480];
export const PLATE = { dy: FRAME.h + 8, h: 40 };
