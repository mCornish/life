import { Generation, nextGeneration } from './game';

describe('Generation()', () => {
  it('creates an array', () => {
    const actual = Array.isArray(Generation());
    const expected = true;
    expect(actual).toBe(expected);
  });
  it('has correct height', () => {
    const actual = Generation(5, 5).length;
    const expected = 5;
    expect(actual).toBe(expected);
  });
  it('has correct width', () => {
    const actual = Generation(5, 5)[0].length;
    const expected = 5;
    expect(actual).toBe(expected);
  });
});

describe('nextGeneration()', () => {
  describe('Block config', () => {
    // prettier-ignore
    const matrix = [
      [1, 1],
      [1, 1]
    ];
    it('remains the same', () => {
      const actual = nextGeneration(matrix);
      const expected = matrix;
      expect(actual).toEqual(expected);
    });
  });
  
  describe('Bee-hive config', () => {
    // prettier-ignore
    const matrix = [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0]
    ];
    it('remains the same', () => {
      const actual = nextGeneration(matrix);
      const expected = matrix;
      expect(actual).toEqual(expected);
    });
  });

  describe('Boat config', () => {
    // prettier-ignore
    const matrix = [
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 0]
    ];
    it('remains the same', () => {
      const actual = nextGeneration(matrix);
      const expected = matrix;
      expect(actual).toEqual(expected);
    });
  });

  describe('Blinker config', () => {
    // prettier-ignore
    const config1 = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    // prettier-ignore
    const config2 = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ];

    it('generates config 1', () => {
      const actual = nextGeneration(config2);
      const expected = config1;
      expect(actual).toEqual(expected);
    });
    it('generates config 2', () => {
      const actual = nextGeneration(config1);
      const expected = config2;
      expect(actual).toEqual(expected);
    });
  });

  describe('Toad config', () => {
    // prettier-ignore
    const config1 = [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    // prettier-ignore
    const config2 = [
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0]
    ];

    it('generates config 1', () => {
      const actual = nextGeneration(config2);
      const expected = config1;
      expect(actual).toEqual(expected);
    });
    it('generates config 2', () => {
      const actual = nextGeneration(config1);
      const expected = config2;
      expect(actual).toEqual(expected);
    });
  });

  describe('Beacon config', () => {
    // prettier-ignore
    const config1 = [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1]
    ];
    // prettier-ignore
    const config2 = [
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 1]
    ];

    it('generates config 1', () => {
      const actual = nextGeneration(config2);
      const expected = config1;
      expect(actual).toEqual(expected);
    });
    it('generates config 2', () => {
      const actual = nextGeneration(config1);
      const expected = config2;
      expect(actual).toEqual(expected);
    });
  });

  describe('Glider config', () => {
    // prettier-ignore
    const config1a = [
      [1, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ];
    // prettier-ignore
    const config2 = [
      [0, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    // prettier-ignore
    const config3 = [
      [0, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    // prettier-ignore
    const config4 = [
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 0]
    ];
    // prettier-ignore
    const config1b = [
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
      [0, 0, 1, 0]
    ];

    it('generates config 1', () => {
      const actual = nextGeneration(config4);
      const expected = config1b;
      expect(actual).toEqual(expected);
    });
    it('generates config 2', () => {
      const actual = nextGeneration(config1a);
      const expected = config2;
      expect(actual).toEqual(expected);
    });
    it('generates config 3', () => {
      const actual = nextGeneration(config2);
      const expected = config3;
      expect(actual).toEqual(expected);
    });
    it('generates config 4', () => {
      const actual = nextGeneration(config3);
      const expected = config4;
      expect(actual).toEqual(expected);
    });
  });
});
