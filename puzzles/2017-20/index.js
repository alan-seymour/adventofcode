const _ = require('lodash');

const splitLines = input => input.split(/\r?\n/);

const parseParticle = (line) => {
  const [fullmatch, p, v, a] = line.match(/p=<(.*)>, v=<(.*)>, a=<(.*)>/);
  return {
    p: p.split(',').map(i => parseInt(i, 10)),
    v: v.split(',').map(i => parseInt(i, 10)),
    a: a.split(',').map(i => parseInt(i, 10)),
  };
};

const updateParticle = (particle) => {
  const newV = particle.v.map((v, i) => v + particle.a[i]);
  const newP = particle.p.map((p, i) => p + newV[i]);
  const dist = newP.reduce((sum, curr) => sum + Math.abs(curr), 0);
  return {
    p: newP, v: newV, a: particle.a, d: dist,
  };
};

const findClosestParticle = (particles) => {
  const closest = particles.reduce((prev, curr, index) => {
    if (prev.d > curr.d || prev.d === null) {
      return { d: curr.d, index };
    }
    return prev;
  }, { d: null });
  return closest.index;
};

const part1 = (particles) => {
  for (let i = 0; i <= 10000; i++) {
    particles = particles.map(particle => updateParticle(particle));
    console.log(i);
  }
  return findClosestParticle(particles);
};

const part2 = (particles) => {
  // TODO: switch to determine when removals have stablilised
  for (let i = 0; i <= 100; i++) {
    particles = particles.map(particle => updateParticle(particle));
    particles = particles.filter((particle, index) => {
      const tempParticles = [...particles.slice(0, index), ...particles.slice(index + 1)];
      return !tempParticles.some(p => _.isEqual(p.p, particle.p));
    });
    console.log(i, particles.length);
  }
  return particles.length;
};

module.exports = (part, data) => {
  const particles = splitLines(data).map(line => parseParticle(line));
  if (part === 1) {
    return part1(particles);
  }
  return part2(particles);
};
