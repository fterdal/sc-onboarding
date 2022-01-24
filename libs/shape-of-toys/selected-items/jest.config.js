module.exports = {
  displayName: 'shape-of-toys-selected-items',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/shape-of-toys/selected-items',
};
