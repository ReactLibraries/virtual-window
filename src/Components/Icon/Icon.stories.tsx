import React from "react";
import { Icon, Icons } from ".";
import styled from "styled-components";
import { Decorator } from "../../Storybook";

export default {
  title: "Components/Icon",
  decorators: [Decorator],
  component: Icon,
};

const Root = styled.div`
  td {
    border: 1px solid;
    box-sizing: border-box;
    line-height: 0;
  }
  td {
    border: 1px solid;
    box-sizing: border-box;
    line-height: 0;
  }
  .normal {
    td {
      height: 32px;
    }
  }
  .large {
    td {
      height: 64px;
    }
  }
`;

export const Primary = (args: Parameters<typeof Icon>[0]) => <Icon {...args} />;
Primary.args = { src: Icons.Normal };
Primary.parameters = {
  viewMode: "docs",
};
export const IconList = () => (
  <Root>
    <table className="normal">
      {Object.entries(Icons).map(([key, value]) => (
        <tr key={key}>
          <td>{`<Icon src={Icons.${key}}/>`}</td>
          <td>
            <Icon src={value} />
          </td>
        </tr>
      ))}
    </table>
  </Root>
);
export const IconList_Button = () => (
  <Root>
    <table className="normal">
      {Object.entries(Icons).map(([key, value]) => (
        <tr key={key}>
          <td>{`<Icon src={Icons.${key}}/>`}</td>
          <td>
            <Icon type="button" src={value} />
          </td>
        </tr>
      ))}
    </table>
  </Root>
);

export const IconList_Large = () => (
  <Root>
    <table className="large">
      {Object.entries(Icons).map(([key, value]) => (
        <tr key={key}>
          <td>{`<Icon src={Icons.${key}}/>`}</td>
          <td>
            <Icon src={value} />
          </td>
        </tr>
      ))}
    </table>
  </Root>
);
