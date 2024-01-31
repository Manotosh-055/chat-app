import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

// const formatTime = (timestamp) => {
//   const date = new Date(timestamp);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
// };

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  console.log(messages);
  return (
    <ScrollableFeed>
      {messages &&
        messages?.map((m, i) => (
          <div style={{ display: "flex", alignItems:"center" }} key={m?._id}>
            {(isSameSender(messages, m, i, user?._id) ||
              isLastMessage(messages, i, user?._id)) && (
                <Tooltip label={m?.sender?.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            <span
              style={{
                // "#BEE3F8" : "#B9F5D0"
                backgroundColor: `${m?.sender?._id === user._id ? "#F3E5F5" : "white"
                  }`,
                marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                marginTop: isSameUser(messages, m, i, user?._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  marginLeft : "0px",
                  color: "#CE93D8",
                  fontFamily:"bold"
                }}>
                {m?.sender?._id !== user._id && m?.chat?.isGroupChat === true ? `${m?.sender?.name}`:""}
              </span>
              <div>
              {m?.content}
              <span
                style={{
                  fontSize: "11px",
                  marginLeft : "7px",
                  color: "gray"
                }}>
                {formatTime(m?.createdAt)}
              </span>
              </div>
        
            </span>

          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
