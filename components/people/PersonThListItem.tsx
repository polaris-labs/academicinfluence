import styled from "@emotion/styled";
import { PersonLink } from "../../links";
import { PersonPartialData } from "../../schema";
import {
  GRAY_DARKEST,
  GRAY_LIGHTER,
  MAIN_DARKER,
  MAIN_LIGHTER
} from "../../styles";
import { useBasicContext } from "../BasicContext";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 17px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 0.5px ${GRAY_DARKEST};
  background-color: ${GRAY_LIGHTER};
  padding: 21px 44px;
`;

const Logo = styled.img`
  width: 103px;
  height: 122px;
`;

const FullDetailsButton = styled.button`
  width: 111px;
  height: 27px;
  border-radius: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  background-color: ${MAIN_LIGHTER};
  margin-top: 23px;
  color: #ffffff;
  outline: none;
`;

const RankingLabel = styled.span`
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-top: 44px;
`;

const RankText = styled.span`
  font-size: 40px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 18px 27px;
`;

const Row = styled.div``;

const BodyRow = styled.div`
  display: flex;
`;

const BodyLeftCol = styled.div`
  flex: 1;
`;

const BodyRightCol = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PersonName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
  margin: 0;
`;

const PersonDescription = styled.p`
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`;

const RightColLabel = styled.span`
  font-size: 12px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
`;

const RightColValue = styled.span`
  font-size: 20px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

const InfoValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 5px;
  margin-bottom: 0;
`;

interface InfoValueProps {
  readonly label: string;
  readonly value: number | null;
}
const InfoValue = (props: InfoValueProps) =>
  props.value === null ? null : (
    <InfoValueWrapper>
      <RightColLabel>{props.label}</RightColLabel>
      <RightColValue>${props.value.toLocaleString()}</RightColValue>
    </InfoValueWrapper>
  );

interface PersonThListItemProps {
  mode: string;
  person: PersonPartialData;
}
const PersonThListItem = (props: PersonThListItemProps) => {
  const basicContext = useBasicContext();

  const { person } = props;

  return (
    <Wrapper>
      <Header>
        <Logo src={person.image_url || undefined} />
        <PersonLink person={person}>
          <FullDetailsButton>See Profile</FullDetailsButton>
        </PersonLink>
        <RankingLabel>Ranking</RankingLabel>
        <RankText>#{person.overall.world_rank}</RankText>
      </Header>
      <Body>
        <Row>
          <PersonName>{person.name}</PersonName>
          <BodyRow>
            <BodyLeftCol>
              <PersonDescription>{person.short_description}</PersonDescription>
            </BodyLeftCol>
          </BodyRow>
        </Row>
      </Body>
    </Wrapper>
  );
};

export default PersonThListItem;
