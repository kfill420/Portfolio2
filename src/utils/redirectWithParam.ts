import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectWithParamProps {
  data: string;
}

export const RedirectWithParam: React.FC<RedirectWithParamProps> = ({ data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(data, { replace: true });
  }, [data, navigate]);

  return null;
};