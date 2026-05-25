import { useNavigate } from "react-router-dom";
import CompetitionSelector from "../components/CompetitionSelector";

export default function Home() {
  const navigate = useNavigate();
  return (
    <CompetitionSelector
      onSelect={(code) => navigate(`/competitions/${code}/matches`)}
    />
  );
}
