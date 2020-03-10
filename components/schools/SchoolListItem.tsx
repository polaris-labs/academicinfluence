import styled from "@emotion/styled";
import {
  GREEN_MID,
  GRAY_MID,
  BACKGROUND_1,
  GREEN_DARK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_LIGHTER
} from "../../styles";
import SchoolStatus from "./SchoolStatus";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 17px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: solid 0.5px ${GRAY_DARK};
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
  background-color: ${GREEN_MID};
  margin-top: 23px;
  color: ${BACKGROUND_1};
`;

const RankingLabel = styled.span`
  font-family: "SF UI Display Medium";
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY_MID};
  margin-top: 44px;
`;

const RankText = styled.span`
  font-family: "Montserrat";
  font-size: 40px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GREEN_DARK};
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  background: #ffffff;
  padding: 18px 27px;
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
  padding-top: 40px;
`;

const SchoolName = styled.h2`
  font-family: "Montserrat";
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GREEN_DARK};
  margin: 0;
`;

const Location = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY_MID};
  margin-top: 5px;
`;

const SchoolDescription = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${GRAY_LIGHT};
`;

const LawImage = styled.img`
  width: 91px;
  height: 82px;
`;

const RightColLabel = styled.span`
  font-family: "SF UI Display Light";
  font-size: 12px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${GRAY_MID};
`;

const RightColValue = styled.span`
  font-family: "SF UI Display Medium";
  font-size: 20px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${GREEN_DARK};
`;

const LawRank = styled.p`
  font-family: "SF UI Display Bold";
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin-top: 10px;
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
  readonly value: number;
}
const InfoValue = (props: InfoValueProps) => (
  <InfoValueWrapper>
    <RightColLabel>Tuition</RightColLabel>
    <RightColValue>{props.value}</RightColValue>
  </InfoValueWrapper>
);

interface SchoolListItemProps {
  mode: string;
  school: any;
}
const SchoolListItem = (props: SchoolListItemProps) => {
  const { school } = props;
  const {
    logo_url,
    overall,
    name,
    city,
    state,
    graduation_rate,
    acceptance_rate,
    short_description,
    undergrad_tuition_in_state,
    average_earnings
  } = school || {};
  const { world_rank } = overall || 1;

  return (
    <Wrapper>
      <Header>
        <Logo src={logo_url} />
        <FullDetailsButton>Full Details</FullDetailsButton>
        <RankingLabel>Ranking</RankingLabel>
        <RankText>#{world_rank}</RankText>
      </Header>
      <Body>
        <BodyLeftCol>
          <SchoolName>{name}</SchoolName>
          <Location>
            {city}, {state}
          </Location>
          <SchoolStatus
            graduationRate={graduation_rate}
            acceptanceRate={acceptance_rate}
          />
          <SchoolDescription>{short_description}</SchoolDescription>
        </BodyLeftCol>
        <BodyRightCol>
          <LawImage src={``} />
          <LawRank>#1 for Law</LawRank>
          <InfoValue label="Tuition" value={undergrad_tuition_in_state} />
          <InfoValue label="Avg. Earnings" value={average_earnings} />
        </BodyRightCol>
      </Body>
    </Wrapper>
  );
};

export default SchoolListItem;
