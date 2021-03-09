import { OVERRIDE_KEY_SUBTLE, DIAGRAM_HEADER_HEIGHT } from "../../utils/constants"
import styled from "styled-components"
import {
  Aside,
  Section,
  Icon,
  Header,
} from "@looker/components"

export const Italics = styled.span`
font-style: italic;
`

export const SettingsPanel = styled(Aside as any)`
border-right: solid 1px ${(props) => props.theme.colors.ui2};
overflow-y: auto;
`

export const Stage = styled(Section as any)`
background: ${(props) => props.theme.colors.ui1};
overflow: hidden;
position: relative;
`
export const Rail = styled(Aside as any)`
border-right: solid 1px ${(props) => props.theme.colors.ui2};
align-items: center;
`

export const ExploreList = styled.ul`
margin: 0;
`

export const ExploreListitem = styled.li`
border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
`

export const ExploreButton = styled.button`
all: inherit;
font-size: ${(props) => props.theme.fontSizes.small};
cursor: pointer;
padding: 12px 12px;
width: 100%;
border: none;


${Icon} {
  transform: translateX(0px);
  transition: all 500ms ease-out;
} 

&:hover {
  background-color: ${OVERRIDE_KEY_SUBTLE};
  
  ${Icon} {
    transform: translateX(4px);
  }

}

& > * {
  pointer-events: none;
}
`

export const ViewList = styled.ul`
margin: 0;
`
export const ViewListItem = styled.li`
border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
`

export const ViewButton = styled.button`
all: inherit;
font-size: ${(props) => props.theme.fontSizes.small};
cursor: pointer;
padding: 12px 12px;
width: 100%;
border: none;

:hover {
  background-color: ${OVERRIDE_KEY_SUBTLE};
}

& > * {
  pointer-events: none;
}
`
export const DiagramHeaderWrapper = styled(Header as any)`
background-color: ${(props) => props.theme.colors.background};
border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
transition: transform 500ms ease-out;
position: relative;
z-index: 1;

&.no-explore {
  transform: translateY(-${DIAGRAM_HEADER_HEIGHT}px);
}

&.has-explore {
  transform: translateY(0);
}
`
