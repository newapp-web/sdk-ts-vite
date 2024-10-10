module.exports = {
  helpers: {
    if_or: function(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name?'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A javascript sdk?'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    namespace:{
      type: 'string',
      message: 'Sdk namespace?'
    }
  },
  filters: {},
  completeMessage:
    'To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}'
};
