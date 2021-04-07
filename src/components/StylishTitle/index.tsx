import Title, { TitleProps } from "antd/lib/typography/Title";
import styled from "styled-components";

const StyledTitle = styled(Title)`
  font-family: "Jua", sans-serif;
`;
const StylishTitle: React.FC<TitleProps> = (props) => {
  return <StyledTitle {...props}>{props.children}</StyledTitle>;
};
export default StylishTitle;
