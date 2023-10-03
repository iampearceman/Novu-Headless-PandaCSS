import { css } from '../../styled-system/css';
import Novu from "./novu";


  export default function Home() {
    return (
      <div>
      <div className={css({ fontSize: "2xl", fontWeight: 'bold' })}>Hello 🐼!</div>
      <Novu />

      </div>
    )
  }