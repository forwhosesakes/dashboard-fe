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
import { useNavigate } from "react-router";
import EditIcon from "~/assets/icons/edit.svg?react";
import RemoveIcon from "~/assets/icons/remove.svg?react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import DeleteMemberDialog from "./components/deleteMemberDialog";
import InviteMemberDialog from "./components/inviteMemberDialog";


// Define the type for a member
export type MemberType = {
  id: string;
  name: string;
  email: string;
  lastActivity: string;
  addedDate: string;
  role: "admin" | "user";
};

// Sample data with roles
const members: MemberType[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    lastActivity: "2024-03-15",
    addedDate: "2024-01-01",
    role: "admin",
  },
  {
    id: "2",
    name: "فاطمة علي",
    email: "fatima@example.com",
    lastActivity: "2024-03-18",
    addedDate: "2023-12-15",
    role: "admin",
  },
  {
    id: "3",
    name: "عمر خالد",
    email: "omar@example.com",
    lastActivity: "2024-03-10",
    addedDate: "2024-02-20",
    role: "admin",
  },
  {
    id: "4",
    name: "نورة سعيد",
    email: "noura@example.com",
    lastActivity: "2024-03-17",
    addedDate: "2024-01-15",
    role: "admin",
  },
  {
    id: "5",
    name: "محمد عبدالله",
    email: "mohammed@example.com",
    lastActivity: "2024-03-16",
    addedDate: "2023-11-30",
    role: "admin",
  },
  {
    id: "6",
    name: "سارة أحمد",
    email: "sara@example.com",
    lastActivity: "2024-03-14",
    addedDate: "2024-02-01",
    role: "user",
  },
  {
    id: "7",
    name: "يوسف إبراهيم",
    email: "yousef@example.com",
    lastActivity: "2024-03-18",
    addedDate: "2024-01-20",
    role: "user",
  },
  {
    id: "8",
    name: "ليلى حسن",
    email: "layla@example.com",
    lastActivity: "2024-03-12",
    addedDate: "2023-12-25",
    role: "user",
  },
  {
    id: "9",
    name: "خالد عمر",
    email: "khaled@example.com",
    lastActivity: "2024-03-17",
    addedDate: "2024-02-15",
    role: "user",
  },
  {
    id: "10",
    name: "رنا محمد",
    email: "rana@example.com",
    lastActivity: "2024-03-15",
    addedDate: "2024-01-10",
    role: "user",
  },
];

const MembersTable = ({
  data,
  title,
  description,
}: {
  data: MemberType[];
  title: string;
  description: string;
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [memberToDelete, seMemberToDeleteType] = useState<MemberType | null>(null);
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<MemberType>();

  const handleEdiMemberClickType = (member: MemberType, e: any) => {
    e.stopPropagation();
    navigate(`member/${member.id}`);
  };

  const handleRemoveMemberClick = (member: MemberType, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    seMemberToDeleteType(member);
  };

  const deleteMember = (id: string) => {
    console.log("Deleting member:", id);
    // Implement delete logic
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
      columnHelper.accessor("lastActivity", {
        header: () => "آخر نشاط",
        cell: (info) => new Date(info.getValue()).toLocaleDateString("ar-SA"),
      }),
      columnHelper.accessor("addedDate", {
        header: () => "تاريخ الإضافة",
        cell: (info) => new Date(info.getValue()).toLocaleDateString("ar-SA"),
      }),
      {
        id: "actions",
        header: () => "الإجراءات",
        cell: ({ row }: any) => {
          return (
            <div className="flex w-fit gap-x-2">
              <Button
                onClick={(e) => handleEdiMemberClickType(row.original, e)}
                variant={"ghost"}
              >
                <EditIcon />
              </Button>
              <Button
                onClick={(e) => handleRemoveMemberClick(row.original, e)}
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
                onClick={() => navigate(`member/${row.original.id}`)}
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
          onClose={() => seMemberToDeleteType(null)}
          onConfirm={() => {
            deleteMember(memberToDelete.id);
            seMemberToDeleteType(null);
          }}
          member={memberToDelete}
        />
      )}
    </div>
  );
};

const Members = () => {
  const admins = members.filter((member) => member.role === "admin");
  const users = members.filter((member) => member.role === "user");
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const handleSendInvite = async ({email,role}:{email:string, role:MemberType["role"]})=>{
    try{
        console.log("send invite to: ",email,"with role:", role);
        //TODO: implement the rest
    } catch(error){
        console.error("failed to send invite:",error)
    }

  }

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
            <Button className="w-fit border"
            onClick={()=>setShowInviteDialog(true)}
            >
                إضافة عضو في الفريق
                <Plus/>
            </Button>
        </div>
      </div>

      <div className="flex flex-col  gap-8">
        <MembersTable
          data={admins}
          title="المستخدمون الإداريون"
          description="يمكن للمسؤولين إضافة وإزالة المستخدمين وإدارة إعدادات مستوى المنظمة."
        />

        <hr className="my-4" />

        <MembersTable
          data={users}
          title="مستخدمو الحساب"
          description="يمكن لمستخدمي الحساب تقييم ومراجعة المخاطر والاستبيانات وتسريبات البيانات وتحديد الانتهاكات."
        />
      </div>
      <InviteMemberDialog
        isOpen={showInviteDialog}
        onClose={() => setShowInviteDialog(false)}
        onSendInvite={handleSendInvite}
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
