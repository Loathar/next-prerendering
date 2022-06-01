import { useEffect, useState } from "react";
import useSWR from "swr";
function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // This hook fetches data from the database.

  const { data, error } = useSWR(
    "https://nextjs-course-c5de2-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  console.log(data);
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-c5de2-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         setSales(data);
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);
  // need to check for sales else we will get undefined when calling map on sales in the fetch function
  if (error) {
    return <p>Failed to load...</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - Volume: {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-c5de2-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return { props: { sales: transformedSales } };
    });
}

export default LastSalesPage;
