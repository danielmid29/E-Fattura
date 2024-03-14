import { useState } from "react";
import { useEffect } from "react";

import "../StyleSheets/OutTemplate.css";
import TemplatePdf from "./CampaignComponents/Invoice-Pdf";

const Out_TemplatePDF = () => {
  const [data, setData] = useState({
    invoice: {},
    survey_and_marketing: { dummy: "" },
    company_info: { dummy: "" },
    template: {
      baseColor: "",
      secondarycolor: "",
    },
  });
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [api, setAPI] = useState("");

  useEffect(() => {
    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);

    setId(params.get("id"));
    console.log(params.get("id"));
    fetchDetails(params.get("id"), params.get("at"));
  }, []);

  const fetchDetails = (id, api) => {
    fetch(
      "http://16.170.159.223/invoice?" +
        new URLSearchParams({
          id: id,
          api: api,
        }),
      {
        method: "GET",
      }
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data) {
          if (response.status === 200) {
            setData(data);
          } else {
            setError(data.error);
          }
        }
      })
      .catch();
  };

  return (
    <TemplatePdf
      data={data}
      model={false}
      color={data.template.baseColor}
      secondarycolor={data.template.secondarycolor}
    />
  );
};

export default Out_TemplatePDF;
