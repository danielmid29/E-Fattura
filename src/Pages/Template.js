import { useState } from "react";
import Template from "./CampaignComponents/Invoice-Template";
import { useEffect } from "react";
import { Hourglass } from "react-loader-spinner";

import "../StyleSheets/OutTemplate.css";

const Out_Template = () => {
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
    console.log(id, api);
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
            console.log(data);
            setData(data);
          } else {
            setError(data.error);
          }
        }
      })
      .catch(console.log(error));
  };

  console.log(Object.keys(data.invoice).length === 0);
  return (
    <div className="main-temp-con">
      <div className="sub-temp-con">
        <Template
          data={data}
          model={false}
          color={data.template.baseColor}
          secondarycolor={data.template.secondarycolor}
        />
      </div>
    </div>
  );
};

export default Out_Template;
