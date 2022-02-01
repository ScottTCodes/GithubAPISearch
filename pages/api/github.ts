import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

import numberTruncate from "../../helpers/numberTruncate";

// const mockData = {
//   data: [
//     {
//       name: 'Arctic Shores Repository',
//       author: 'ScottTCodes',
//       stars: '70',
//       image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
//     },
//     {
//       name: 'Arctic Shores Repository 2',
//       author: 'ScottTCodes',
//       stars: '70',
//       image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
//     },
//     {
//       name: 'Arctic Shores Repository 3',
//       author: 'ScottTCodes',
//       stars: '70',
//       image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
//     },
//   ],
// };

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    q: string,
    sort: "stars" | "forks" | "help-wanted-issues" | "updated",
  };
}

const github = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { q = ' ', sort } = req.body;
  const results: Array<object> = [];
  const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
  });

  const search = await octokit.request('GET /search/repositories', {
    q: q,
    sort: sort ? sort : undefined,
    order: 'desc',
    per_page: 10,
    page: 1,
  }).then((res) => {
    const { items } = res.data;
    console.log(res.data)

    items.map((item) => {
      const { name, stargazers_count: stars, owner } = item;

      results.push({
        name,
        author: owner && owner.login,
        stars: numberTruncate(stars),
        image: owner && owner.avatar_url,
      });
    });
  });

  return res.status(200).json(results);
}

export default github;
