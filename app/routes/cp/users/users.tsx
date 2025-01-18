import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { USER_MGMT } from "./glossary";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState, type HTMLProps } from "react";
import { useNavigate } from "react-router";
import Badge from "~/components/ui/badge";
import EditIcon from "~/assets/icons/edit.svg?react";
import RemoveIcon from "~/assets/icons/remove.svg?react";
import { Button } from "~/components/ui/button";
import { DashboardEnum } from "~/types/dashboard.types";
import type { TClientOverview } from "~/types/users.types";
import DeleteUserDialog from "./components/deleteUserDialog";

const DashboardBadgeColor: {
  [key in DashboardEnum]: "mauv" | "red" | "blue" | "green";
} = {
  [DashboardEnum.CORPORATE_DASHBOARD]: "blue",
  [DashboardEnum.FINANCIAL_DASHBOARD]: "green",
  [DashboardEnum.OPERATIONAL_DASHBOARD]: "red",
  [DashboardEnum.GENERAL_DASHBOARD]: "mauv",
};

const clients = [
  {
    id: "1",
    name: "جمعية مكار الأخلاق",
    email: "olivia@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
    ],
  },
  {
    id: "2",
    name: " جمعية حفظ النعمة ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
    ],
  },
  {
    id: "4",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "5",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "6",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "7",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "8",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "9",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "12",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "33",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "23",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "54",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
  {
    id: "43",
    name: " جمعية الخير الدائم  ",
    email: "phoenix@untitledui.com",
    dashboards: [
      DashboardEnum.CORPORATE_DASHBOARD,
      DashboardEnum.OPERATIONAL_DASHBOARD,
      DashboardEnum.FINANCIAL_DASHBOARD,
      DashboardEnum.GENERAL_DASHBOARD,
    ],
  },
];
const columnHelper = createColumnHelper<TClientOverview>();

const Users = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [userToDelete, setUserToDelete] = useState<TClientOverview | null>(
    null
  );
  const navigate = useNavigate();

  const handleEditUserClick = (user: TClientOverview, e: any) => {
    navigate("client/" + user.id);
  };

  const deleteUser = () => {
    console.log("click user delete");
  };

  const handleRemoveUserClick = (user: TClientOverview, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setUserToDelete(user);
  };
  const columns: ColumnDef<TClientOverview, any>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: any) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }: any) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      columnHelper.accessor("name", {
        header: () => <span>الاسم</span>,
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("email", {
        header: () => "البريد الالكتروني",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("dashboards", {
        header: () => " لوحات البيانات",
        cell: (info) => {
          return (
            <div className="flex  items-center gap-x-2">
              {(info.getValue() as DashboardEnum[]).map((d) => (
                <Badge color={DashboardBadgeColor[d]}>
                  {USER_MGMT.DASHBOARD_TYPE[d]}
                </Badge>
              ))}
            </div>
          );
        },
      }),

      {
        id: "actions",
        header: () => "الإجراء",
        cell: ({ row }: any) => {
          return (
            <div className="flex  w-fit gap-x-2">
              <Button
                onClick={(e) => handleEditUserClick(row.original, e)}
                variant={"ghost"}
              >
                <EditIcon />
              </Button>
              <Button
                onClick={(e) => handleRemoveUserClick(row.original, e)}
                variant={"ghost"}
              >
                <RemoveIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable<TClientOverview>({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    // getFilteredRowModel: getFilteredRowModel(),
    // getRowId: (row) => row.id,
  });

  return (
    <section className="p-4">
      <h6 className=""> {USER_MGMT.PAGE_TITLE}</h6>
      <p>{USER_MGMT.PAGE_DESCRIPTION}</p>

      <hr className="my-4" />

      <div>
        <Table className="mx-auto  text-[#027163]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-right" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                onClick={() => navigate("client/" + row.original.id)}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {userToDelete && (
        <DeleteUserDialog
          isOpen={userToDelete !== null}
          onClose={() => setUserToDelete(null)}
          onConfirm={() => {
            deleteUser(userToDelete.id);
            setUserToDelete(null);
          }}
          user={userToDelete}
        />
      )}
    </section>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      onClick={(e: any) => {
        e.stopPropagation();
      }}
      className={className + "cursor-pointer"}
      {...rest}
    />
  );
}

export default Users;
