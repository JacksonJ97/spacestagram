const formatData = (data) => {
  const filteredData = data.filter((item) => item.media_type === "image");

  const formattedData = filteredData.map((item) => ({
    date: item.date,
    title: item.title,
    url: item.url,
    liked: false,
    explanation: item.explanation,
  }));

  return formattedData;
};

export default formatData;
