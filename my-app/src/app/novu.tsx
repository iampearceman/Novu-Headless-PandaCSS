'use client';

import { HeadlessService, FetchResult, ISession } from '@novu/headless';
import { useState, createContext } from "react";




const headlessService = new HeadlessService({
  applicationIdentifier: "Kzaqr_H9HtvD",
  subscriberId: "638e13005e962a70bf4034e1", 
});

headlessService.initializeSession({
  listener: (res: FetchResult<ISession>) => {
    console.log(res);
  },
  onSuccess: (session: ISession) => {
    console.log(session);
  },
  onError: (error) => {
    console.error(error);
  },
});

const Novu = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNewNotifications = () => {
    headlessService.fetchNotifications({
      listener: ({ data, error, isError, isFetching, isLoading, status }) => {
        console.log({ data, error, isError, isFetching, isLoading, status });
      },
      onSuccess: (response) => {
        console.log(
          "in success of fetch notifications--->",
          response.data,
          response.page,
          response.totalCount,
          response.pageSize
        );
        setNotifications(response.data);
      },
      page: 1,
      limit: 20 // page number to be fetched
    });
  };

  const deleteASingleNotification = (notificationId) => {
    headlessService.removeNotification({
      listener: (result) => {
        console.log("result of removeNotification -->", result);
      },
      onSuccess: (message) => {
        console.log("on success of removeNotification -->", message);
      },
      onError: (error) => {
        console.error("on error of removeNotification -->", error);
      },
      messageId: notificationId
    });
  };

  const fetchAllUnreadCount = () => {
    headlessService.fetchUnreadCount({
      listener: (result) => {
        console.log(result);
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  return (
    <div className="notification-container">
      <button className="action-button" onClick={() => fetchNewNotifications()}>
        Fetch new notifications
      </button>
      <button className="action-button" onClick={() => fetchAllUnreadCount()}>
        Count unread
      </button>
      {notifications.map((item, index) => {
        return (
          <div key={index} className="notification">
            <span className="notification-content">
              {index + 1} -- {item.content}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteASingleNotification(item._id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};


export default Novu;
