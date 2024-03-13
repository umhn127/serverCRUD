const getStatus = (status) => {
  switch (status) {
    case "important":
      return <span className="badge bg-danger">Önemli</span>;
    case "daily":
      return <span className="badge bg-primary">Günlük</span>;
    case "job":
      return <span className="badge bg-warning">İş</span>;
  }
};
export default getStatus;
