import Image from "next/image";
import Quote from '../components/Quote';

export default function Home() {
  return (
    <div>
      <h1>Quote of the Day</h1>
      <Quote />
    </div>
  );
}
