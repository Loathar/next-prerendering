function UserProfile(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfile;

export async function getServerSideProps(contex) {
  const { params, req, res } = contex;

  console.log(req);
  console.log(res);
  return { props: { username: "Max" } };
}
