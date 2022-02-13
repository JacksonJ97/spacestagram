const testFormatData = (data) => {
  const filteredData = data.filter((item) => item.media_type === "image");

  const formattedData = filteredData.map((item) => ({
    date: item.date,
    title: item.title,
    url: item.url,
    explanation: item.explanation,
    liked: false,
  }));

  return formattedData;
};

export default testFormatData;
