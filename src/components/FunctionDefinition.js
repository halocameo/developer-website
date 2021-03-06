import React from 'react';
import PropTypes from 'prop-types';
import CodeDef from './CodeDef';
import { graphql } from 'gatsby';

const FunctionDefinition = ({ className, arguments: params, returnValue }) => {
  return (
    <CodeDef className={className}>
      <CodeDef.Keyword>function</CodeDef.Keyword>{' '}
      <CodeDef.Bracket>{params.length > 0 ? '(' : '()'}</CodeDef.Bracket>
      {params.length > 0 && (
        <CodeDef.Block>
          {params.map((param, i) => (
            <div key={i}>
              <CodeDef.Identifier>
                {param.type.startsWith('...') ? `...${param.name}` : param.name}
                :{' '}
              </CodeDef.Identifier>
              <CodeDef.Type>{param.type}</CodeDef.Type>
              {i !== params.length - 1 ? ', ' : ' '}
              <CodeDef.Comment text={param.description} />
            </div>
          ))}
        </CodeDef.Block>
      )}
      {params.length > 0 && <CodeDef.Bracket>)</CodeDef.Bracket>}
      <CodeDef.Operator> => </CodeDef.Operator>
      <CodeDef.Type>{returnValue.type}</CodeDef.Type>
    </CodeDef>
  );
};

FunctionDefinition.propTypes = {
  className: PropTypes.string,
  arguments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  returnValue: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export const query = graphql`
  fragment FunctionDefinition_arguments on NewRelicSdkFunctionArgument {
    name
    type
    description
  }

  fragment FunctionDefinition_returnValue on NewRelicSdkFunctionReturnValue {
    type
  }
`;

export default FunctionDefinition;
