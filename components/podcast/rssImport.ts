export type ImportParam = {
  rss: string;
  success: (data: any) => void;
  error: (err: any) => void;
  finally: () => void;
};

export const rssImport = (param: ImportParam) => {
  fetch("/api/podcast/import", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({rss: param.rss}),
  })
    .then((res) => res.json())
    .then((data: any) => {
      param.success(data);
    })
    .catch((err) => {
      param.error(err);
    })
    .finally(() => {
      param.finally();
    });
};
