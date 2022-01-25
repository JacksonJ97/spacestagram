const formatData = (data) => {
  const formattedData = data.map((item) => ({
    media_type: item.media_type,
    url: item.url,
    title: item.title,
    explanation: item.explanation,
    date: item.date,
    liked: false,
  }));
  return formattedData;
};

export default formatData;
