const columns = [
    {
      id: "service_type",
      label: "Service Type",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "schedule",
      label: "Schedule",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    { id: "address", label: "Address", minWidth: 100 },
    {
      id: "phone",
      label: "Phone Number",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  module.exports = columns