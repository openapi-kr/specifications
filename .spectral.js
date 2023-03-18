const ibmCloudValidationRules = require('@ibm-cloud/openapi-ruleset') // Note 1

// https://swagger.io/specification/#components-object
const NAMING_REGEX = /^[a-zA-Z0-9\.\-_]+$/i

module.exports = {
  extends: ibmCloudValidationRules,
  rules: {
    'unused-tag': 'error',
    'operation-id-case-convention': 'off',
    'major-version-in-path': 'off',
    'path-segment-case-convention': 'off',
    'enum-case-convention': 'off',
    'property-case-convention': 'off',
    'parameter-case-convention': 'off',
    'string-boundary': 'off',
    'components-key-naming-convention': {
      description:
        'Components fixed fields must be alphanumeric, with optional hyphens, underscores, or periods.',
      message: '{{error}}',
      resolved: true,
      given: [
        '$.components.schemas[*]',
        '$.components.responses[*]',
        '$.components.parameters[*]',
        '$.components.examples[*]',
        '$.components.requestBodies[*]',
        '$.components.headers[*]',
        '$.components.securitySchemes[*]',
        '$.components.links[*]',
        '$.components.callbacks[*]',
        '$.components.pathItems[*]',
      ],
      severity: 'error',
      then: {
        function: (_, __, { path }) => {
          const name = path.at(-1)
          if (!NAMING_REGEX.test(name)) {
            return [
              {
                message: `Schema name '${name}' does not match naming convention`,
              },
            ]
          }
        },
      },
    },
  },
}
