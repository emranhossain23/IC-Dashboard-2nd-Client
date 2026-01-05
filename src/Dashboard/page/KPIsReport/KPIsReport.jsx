import KPI from "@/component/KPI/KPI";
import React, { useEffect, useState } from "react";

import {
  FaPhoneAlt,
  FaPhoneVolume,
  FaSms,
  FaCalendarCheck,
  FaEye,
  FaHandshake,
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { HiPresentationChartLine } from "react-icons/hi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const KPIsReport = () => {
    const locationId = import.meta.env.VITE_LOCATION_ID;
const authToken = import.meta.env.VITE_AUTHORIZATION;

  const conversionRatePipelines = [
    { name: "Unqualified", id: "2aeae35-d676-4a34-924b-af9a76aacce6" },
    { name: "In Communication", id: "a183931d-84f3-41aa-90b3-e346924d4454" },
    { name: "Not Interested", id: "8077796c-9b09-459c-b4b1-90a5491b70c8" },
    { name: "VTC Appointment", id: "78906967-c7f9-4d27-903a-c55fa5007480" },
    {
      name: "Scheduled Appointment",
      id: "bbeb7c55-c4f6-475e-9a4d-dd4ecdfc0868",
    },
    { name: "No Show/Cancel", id: "76f77f91-63a7-457f-841f-34d6debaa7ca" },
    { name: "APPT Rescheduled", id: "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9" },
    {
      name: "Presented Treatment -> Follow Up/ Sent Brownies",
      id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
    },
    {
      name: "Tx Plan Not Accepted",
      id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
    },
    { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const bookingRatePipelines = [
    {
      name: "Scheduled Appointment",
      id: "bbeb7c55-c4f6-475e-9a4d-dd4ecdfc0868",
    },
    { name: "No Show/Cancel", id: "76f77f91-63a7-457f-841f-34d6debaa7ca" },
    { name: "APPT Rescheduled", id: "95e6a5e9-dbe7-4f48-8ab5-b3b0ab853fd9" },
    {
      name: "Presented Treatment -> Follow Up/ Sent Brownies",
      id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
    },
    {
      name: "Tx Plan Not Accepted",
      id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
    },
    { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const showingRatePipelines = [
    {
      name: "Presented Treatment -> Follow Up/ Sent Brownies",
      id: "d03001f6-d60a-4eb8-a461-7b9a877dba32",
    },
    {
      name: "Tx Plan Not Accepted",
      id: "6212e70c-d64a-4914-bbb1-f0ba4dd87768",
    },
    { name: "Financing Denied", id: "769ed20f-560d-47fe-975e-0b9becc15bcd" },
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const closeRatePipelines = [
    { name: "STARTED TREATMENT", id: "392445b2-9fb8-42aa-8a73-824c00cef267" },
  ];

  const conversationPipelineStageIdSet = new Set(
    conversionRatePipelines.map((p) => p.id)
  );

  const bookingPipelineStageIdSet = new Set(
    bookingRatePipelines.map((p) => p.id)
  );

  const showingPipelineStageIdSet = new Set(
    showingRatePipelines.map((p) => p.id)
  );

  const closePipelineStageIdSet = new Set(closeRatePipelines.map((p) => p.id));

  const fetchAllOpportunities = async () => {
    let allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(
        "https://services.leadconnectorhq.com/opportunities/search",
        {
          params: {
            // location_id: "***",
            location_id: locationId,
            limit: 100,
            page,
          },
          headers: {
            Accept: "application/json",
            Version: "2021-07-28",
            // Authorization: "Bearer ***",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const opportunities = response.data.opportunities || [];
      allData.push(...opportunities);

      if (opportunities.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allData;
  };

//   const fetchAllMessages = async () => {
//     let cursor = null;
//     let allData = [];

//     do {
//       const res = await axios.get(
//         "https://services.leadconnectorhq.com/conversations/messages/export",
//         {
//           params: {
//             // locationId: "***",
//             location_id: locationId,
//             limit: 100,
//             cursor,
//           },
//           headers: {
//             Accept: "application/json",
//             Version: "2021-07-28",
//             // Authorization: "Bearer ***",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       allData.push(...(res.data.messages || []));
//       cursor = res.data.nextCursor || null;
//     } while (cursor);

//     return allData;
//   };

const fetchAllMessages = async () => {
  let cursor = null;
  let allData = [];

  do {
    const params = { locationId: locationId, limit: 100 };
    if (cursor) params.cursor = cursor;

    const res = await axios.get(
      "https://services.leadconnectorhq.com/conversations/messages/export",
      {
        params,
        headers: {
          Accept: "application/json",
          Version: "2021-07-28",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    allData.push(...(res.data.messages || []));
    cursor = res.data.nextCursor || null;
  } while (cursor);

  return allData;
};

  const {
    data: leads = [],
    isLoading: opporLoading,
    //   isError,
    //   error,
  } = useQuery({
    queryKey: ["opportunities", authToken],
    queryFn: fetchAllOpportunities,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const {
    data: messages = [],
    isLoading: convLoading,
    //   isError,
    //   error,
  } = useQuery({
    queryKey: ["messages", authToken],
    queryFn: fetchAllMessages,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["opportunities", "location_id"],
  //       queryFn: fetchAllOpportunities,
  //       staleTime: 5 * 60 * 1000,
  //     },
  //     {
  //       queryKey: ["messages", "location_id"],
  //       queryFn: fetchAllMessages,
  //       staleTime: 5 * 60 * 1000,
  //     },
  //   ],
  // });

  // const leads = results[0].data ?? [];
  // const messages = results[1].data ?? [];

  // const isLoading = results.some(r => r.isLoading);
  // const isError = results.some(r => r.isError);

  // all leads
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "https://services.leadconnectorhq.com/opportunities/search?location_id=***",
  //     headers: {
  //       Accept: "application/json",
  //       Version: "2021-07-28",
  //       Authorization: "Bearer ***",
  //     },
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setLeads(response.data.meta.total);
  //       //   console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  /* all messages */
  //   useEffect(() => {
  //     let messages_config = {
  //       method: "get",
  //       maxBodyLength: Infinity,
  //       url: "https://services.leadconnectorhq.com/conversations/messages/export?locationId=***",
  //       headers: {
  //         Accept: "application/json",
  //         Version: "2021-04-15",
  //         Authorization: "Bearer ***",
  //       },
  //     };

  //     axios
  //       .request(messages_config)
  //       .then((response) => {
  //         //   console.log(response.data.messages);
  //         setMessages(response.data.messages);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  if (opporLoading || convLoading) {
    return "Loading...";
  }

  const totalInboundCalls = messages.filter(
    (message) =>
      message.direction === "inbound" && message.messageType === "TYPE_CALL"
  );

  const answeredInboundCalls = totalInboundCalls.filter(
    (call) => call.status === "completed"
  );

  // Inbound Call Rate = (Answered Inbound Calls ÷ Total Inbound Calls) × 100
  const inboundCallRate = (
    (answeredInboundCalls.length / totalInboundCalls.length) *
    100
  ).toFixed(2);

  // Conversion Rate = Total Conversion / ( Total Lead * 60%)
  const conversionLead = leads.filter((lead) =>
    conversationPipelineStageIdSet.has(lead.pipelineStageId)
  );
  const conversionRate = (conversionLead.length / (leads.length * 0.6)).toFixed(
    2
  );

  // Booking Rate = Total Booked /( Total Lead * 25%)
  const totalBooked = leads.filter((lead) =>
    bookingPipelineStageIdSet.has(lead.pipelineStageId)
  );
  const bookingRate = (totalBooked.length / (leads.length * 0.25)).toFixed(2);

  // Showing Rate = Showing Lead / {(Total Lead * 25%) * 50%}
  const showingLead = leads.filter((lead) =>
    showingPipelineStageIdSet.has(lead.pipelineStageId)
  );
  const showingRate = (
    showingLead.length /
    (leads.length * 0.25 * 0.5)
  ).toFixed(2);

  // Close Rate = Total Close / [{(Total Lead * 25%)*50%} *25%]
  const closeLead = leads.filter((lead) =>
    closePipelineStageIdSet.has(lead.pipelineStageId)
  );
  const closeRate = (
    closeLead.length /
    (leads.length * 0.25 * 0.5 * 0.25)
  ).toFixed(2);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <KPI
          label="Total Lead"
          icon={HiPresentationChartLine}
          bg="#4F46E5"
          value={leads.length || 0}
        />

        <KPI
          label="Inbound Call Rate"
          icon={FaPhoneVolume}
          bg="#0EA5E9"
          value={`${inboundCallRate || "00"}%`}
        />

        <KPI
          label="Conversion Rate"
          icon={BsGraphUp}
          bg="#22C55E"
          value={`${conversionRate || "00"}%`}
        />

        <KPI
          label="Lead Call Response Time"
          icon={FaPhoneAlt}
          bg="#F97316"
          value="00"
        />

        <KPI
          label="Lead Text Response Time"
          icon={FaSms}
          bg="#A855F7"
          value="00"
        />

        <KPI
          label="Booking Rate"
          icon={FaCalendarCheck}
          bg="#06B6D4"
          value={`${bookingRate || "00"}%`}
        />

        <KPI
          label="Showing Rate"
          icon={FaEye}
          bg="#EAB308"
          value={`${showingRate || "00"}%`}
        />

        <KPI
          label="Close Rate"
          icon={FaHandshake}
          bg="#EF4444"
          value={`${closeRate || "00"}%`}
        />
      </div>
    </div>
  );
};

export default KPIsReport;
