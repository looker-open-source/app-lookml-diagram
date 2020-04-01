import React, { FC } from "react";
import { IconButton, IconNames } from "@looker/components";
import styled from "styled-components";

interface SidebarToggleProps {
  isOpen: boolean;
  headerHeight: string;
  onClick: () => void;
}

const SidebarToggle: FC<SidebarToggleProps> = ({
  isOpen,
  onClick,
  headerHeight
}) => {
  const iconName: IconNames = isOpen ? "CaretLeft" : "CaretRight";

  return (
    <SidebarToggleWrapper headerHeight={headerHeight}>
      <IconButton
        shape="round"
        icon={iconName}
        onClick={onClick}
        label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        size="small"
        outline
      />
    </SidebarToggleWrapper>
  );
};

interface WrapperProps {
  headerHeight?: string;
}

const SidebarToggleWrapper = styled.div<WrapperProps>`
  position: relative;
  margin-top: calc(${props => props.headerHeight} / 2);
  z-index: 1;
  ${IconButton} {
    background: #fff;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
  }
`;

export default SidebarToggle;
