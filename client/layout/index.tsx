import { Rooms } from "../components/rooms";
import { MainWrapper } from "../styles";

export default function Layout({ children }) {

  return (
    <MainWrapper>
      <Rooms />
      {/* <Split
        sizes={[25, 75]}
        cursor='col-resize'
        expandToMin={false}
        gutterSize={10}
        direction='vertical'
      >
        <div>hello</div>
        <div>there</div>
      </Split> */}
      { children }
    </MainWrapper>
  )
}
