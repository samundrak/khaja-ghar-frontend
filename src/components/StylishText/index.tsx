import Text, { TextProps } from "antd/lib/typography/Text";
import styled from "styled-components";

const StyledText = styled(Text)`
  font-family: "Jua", sans-serif;
  color: white;
`;
const StylishText: React.FC<TextProps> = (props) => {
  return <StyledText>{props.children}</StyledText>;
};
export default StylishText;
