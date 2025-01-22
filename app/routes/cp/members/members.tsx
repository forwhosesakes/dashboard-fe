import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState, type HTMLProps } from "react";
import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import EditIcon from "~/assets/icons/edit.svg?react";
import RemoveIcon from "~/assets/icons/remove.svg?react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import DeleteMemberDialog from "./components/deleteMemberDialog";
import InviteMemberDialog from "./components/inviteMemberDialog";
import EditMemberDialog from "./components/editMemberDialog";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const serverUrl = context.cloudflare.env.BASE_URL;

  try {
    const cookieHeader = request.headers.get("Cookie");

    const res = await authClient(serverUrl).admin.listUsers({
      query: {
        filterField: "role",
        filterOperator: "eq",
        filterValue: "admin",
      },
      fetchOptions: {
        headers: {
          Cookie: cookieHeader || "",
        },
      },
    });

    const currentUser = await authClient(serverUrl).getSession({
      fetchOptions: {
        headers: {
          Cookie: cookieHeader || "",
        },
      },
    });
    const isAdmin = currentUser.data?.user.subRole === "admin";

    return { users: res?.data?.users, serverUrl, isAdmin };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      users: [],
      isAdmin: false,
      error: "Failed to fetch users",
      stats: 500,
    };
  }
}

// Define the type for a member
export type MemberType = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: "admin" | "user";
  subRole: "org" | "dataEntry" | "admin";
};

const MembersTable = ({
  data,
  title,
  description,
}: {
  data: MemberType[];
  title: string;
  description: string;
}) => {
  const [memberToEdit, setMemberToEdit] = useState<MemberType | null>(null);
  const { isAdmin, serverUrl } = useLoaderData();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [memberToDelete, setMemberToDeleteType] = useState<MemberType | null>(
    null
  );
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<MemberType>();

  const handleEdiMemberClickType = (member: MemberType, e: any) => {
    e.stopPropagation();
    setMemberToEdit(member)
    // navigate(`member/${member.id}`);
  };

  const handleRemoveMemberClick = (member: MemberType, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setMemberToDeleteType(member);
  };

  const editMember = async (member: MemberType,newRole:string) => {
    try {
      if (memberToEdit){
        
        const response = await fetch(`${serverUrl}/users/updateSubRole`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
                Cookie:document.cookie || "",
            },
            body:JSON.stringify({
                id:member.id,
                subRole:newRole
            }),
            credentials:'include'
        })
        console.log("response is ", response);
        
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || "Failed to update user");
        }
        toast.success("تم تحديث العضو "+member.name+" بنجاح")

      }
      
    } catch (error) {
      console.error(error);
    //   toast.error("فشل تحديث العضو " + member?.name);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await authClient(serverUrl).admin.removeUser({
        userId: id,
      });

      toast.success("تم حذف العضو بنجاح");
    } catch (error) {
      console.error("Failed to delete member:", error);
      toast.error("فشل حذف العضو");
    }
  };

  const columns = useMemo(
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
        header: () => "البريد الإلكتروني",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("createdAt", {
        header: () => "تاريخ الإضافة",
        cell: (info) => new Date(info.getValue()).toLocaleDateString("ar-SA"),
      }),

      {
        id: "actions",
        header: () => "الإجراءات",

        cell: ({ row }: any) => {
          return (
            <div className="flex w-full justify-center items-center">
              <Button
                onClick={(e) => handleEdiMemberClickType(row.original, e)}
                variant={"ghost"}
                disabled={!isAdmin}
                className="w-fit"
              >
                <EditIcon />
              </Button>
              <Button
                onClick={(e) => handleRemoveMemberClick(row.original, e)}
                variant={"ghost"}
                disabled={!isAdmin}
                className="w-fit"
              >
                <RemoveIcon className="text-red-600" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable<MemberType>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="flex gap-8 items-start h-1/2">
      <div className="w-1/4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-primary-foreground">
          {title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex-1 max-h-[350px] overflow-auto">
        <Table className="w-full text-[#027163]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-center" key={header.id}>
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
                className="cursor-pointer text-center items-center"
                onClick={() => {
                  isAdmin && navigate(`member/${row.original.id}`);
                }}
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

      {memberToDelete && (
        <DeleteMemberDialog
          isOpen={memberToDelete !== null}
          onClose={() => setMemberToDeleteType(null)}
          onConfirm={() => {
            deleteMember(memberToDelete.id);
            setMemberToDeleteType(null);
          }}
          member={memberToDelete}
        />
      )}
      {memberToEdit && (
        <EditMemberDialog
          isOpen={memberToEdit !== null}
          onClose={() => setMemberToEdit(null)}
          onConfirm={(v) => {
            
            editMember(memberToEdit,v)
            setMemberToEdit(null)
          }}
          member={memberToEdit}

        />
      )}
    </div>
  );
};

const Members = () => {
  const { users, serverUrl, isAdmin } = useLoaderData();
  console.log("users:", users, "serverUrl:", serverUrl);

  const admins = users?.filter((member) => member?.subRole === "admin");
  const dataEntries = users?.filter(
    (member) => member?.subRole === "dataEntry"
  );
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  return (
    <section className="p-4 flex flex-col  gap-12">
      <div className="flex  justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-primary-foreground">
            أعضاء الفريق
          </h1>
          <p>قائمة بجميع الأعضاء المسجلين في النظام</p>
        </div>

        <div className="w-3/12 flex items-end">
          <Button
            className="w-fit border hover:text-primary hover:bg-accent"
            onClick={() => setShowInviteDialog(true)}
            disabled={!isAdmin}
          >
            إضافة عضو في الفريق
            <Plus />
          </Button>
        </div>
      </div>

      <div className="flex flex-col border  gap-8">
        <MembersTable
          data={admins}
          title="المستخدمون الإداريون"
          description="يمكن للمسؤولين إضافة وإزالة المستخدمين وإدارة إعدادات مستوى المنظمة."
        />

        <hr className="my-4" />

        <MembersTable
          data={dataEntries}
          title="مستخدمو الحساب"
          description="يمكن لمستخدمي الحساب تقييم ومراجعة المخاطر والاستبيانات وتسريبات البيانات وتحديد الانتهاكات."
        />
      </div>
      <InviteMemberDialog
        isOpen={showInviteDialog}
        onClose={() => setShowInviteDialog(false)}
        closeDialog={setShowInviteDialog}
        serverUrl={serverUrl}
        isAdmin={isAdmin}
      />
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

export default Members;
