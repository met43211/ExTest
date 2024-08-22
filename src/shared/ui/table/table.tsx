import { Button } from "../buttons/button/button";
import styles from "./table.module.scss";

type TTitle = {
  id: string | number;
  title: React.ReactNode;
  width: string;
};

type TData = { id: string | number } & Record<string, string | React.ReactNode>;

type Props = {
  titles: TTitle[];
  data: TData[];
  getActionsFunc?: (actionsProps: TData["id"]) => React.ReactNode;
  itemAction?: (item: TData) => void;
  minWidth?: number;
};

export const Table = ({
  titles,
  data,
  getActionsFunc,
  itemAction,
  minWidth,
}: Props) => {
  return (
    <table className={styles.table} style={{ minWidth }}>
      <thead>
        <tr>
          {titles.map((title) => (
            <th
              key={title.id}
              className={styles.title}
              style={{ width: title.width }}
            >
              {title.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const { id, ...rest } = row;
          const rowData = { ...rest };
          if (getActionsFunc) {
            rowData.action = getActionsFunc(id);
          }
          const cols = Object.values(rowData);
          return (
            <tr key={id}>
              {cols.map((value, i) => (
                <td key={Object.keys(rowData)[i]}>
                  {getActionsFunc && i + 1 === cols.length ? (
                    <>{value}</>
                  ) : (
                    <Button
                      onClick={() => {
                        if (itemAction) {
                          itemAction(row);
                        }
                      }}
                      className={styles.button}
                    >
                      {value}
                    </Button>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
