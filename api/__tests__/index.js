'use strict';
const Service = require('../controllers/controller.js');
  describe("UUID performance testing", () => {
    it('should run faster than 50ms', async () => {
      const t0 = performance.now();
      const uuid = Service.generateId();
      const t1 = performance.now();
      expect(t1 - t0).toBeLessThanOrEqual(50);
      });
  });