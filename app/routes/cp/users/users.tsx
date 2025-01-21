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
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import Badge from "~/components/ui/badge";
import EditIcon from "~/assets/icons/edit.svg?react";
import RemoveIcon from "~/assets/icons/remove.svg?react";
import { Button } from "~/components/ui/button";
import { DashboardEnum } from "~/types/dashboard.types";
import type { TClientOverview } from "~/types/users.types";
import DeleteUserDialog from "./components/deleteUserDialog";
import { OrganizationsAPI } from "~/services/org";
import { APIError } from "~/lib/utils/error";

const DashboardBadgeColor: {
  [key in DashboardEnum]: "mauv" | "red" | "blue" | "green";
} = {
  [DashboardEnum.CORPORATE_DASHBOARD]: "blue",
  [DashboardEnum.FINANCIAL_DASHBOARD]: "green",
  [DashboardEnum.OPERATIONAL_DASHBOARD]: "red",
  [DashboardEnum.GENERAL_DASHBOARD]: "mauv",
};


type LoaderData = 
  | {
      status: "success";
      data: TClientOverview[];
      pagination: {
        total: number;
        currentPage: number;
        totalPages: number;
        hasMore: boolean;
      };
    }
  | {
      status: "error";
      message: string;
    };


export async function loader({request,context}:LoaderFunctionArgs){
    const serverUrl = context.cloudflare.env.BASE_URL
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
  

    try {
        // Call the API
        const response = await OrganizationsAPI.getOverview({ page }, serverUrl);
    
        // Check for API-level errors
        if (response.status !== "success") {
          throw new Error(response.message);
        }
    
        // Return successful response
        return Response.json({
          status: "success" as const,
          data: response.data,
          pagination: response.pagination
        });
      } catch (error) {
        // Handle different types of errors
        if (error instanceof APIError) {
          return Response.json({
            status: "error" as const,
            message: error.response.message || "API Error",
          }, { status: 400 });
        }
    
        // Handle unexpected errors
        console.error("Unexpected error in organizations loader:", error);
        return Response.json({
          status: "error" as const,
          message: "An unexpected error occurred",
        }, { status: 500 });
      }
    }
    
const columnHelper = createColumnHelper<TClientOverview>();

const Users = () => {
    const loaderData = useLoaderData<typeof loader>() as unknown as LoaderData;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [userToDelete, setUserToDelete] = useState<TClientOverview | null>(
    null
  );
  const navigate = useNavigate();
  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", newPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  const handleEditUserClick = (user: TClientOverview, e: any) => {
    navigate("prg/" + user.id);
  };

  const deleteUser = (userId:string) => {
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
    data: loaderData.status==="success"?loaderData.data:[],
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
                onClick={() => navigate("org/" + row.original.id)}
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
            deleteUser(userToDelete?.id);
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
