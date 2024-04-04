import { Search, MoreHorizontal, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface AttendeesProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [search, SetSearch] = useState("");
  const [page, setPage] = useState(1);
  const [attendees, setAttendees] = useState<AttendeesProps[]>([]);

  const totalPages = Math.ceil(attendees.length / 10);

  useEffect(() => {
    fetch("http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees")
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
      });
  }, [page]);

  function OnSerchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    SetSearch(event.target.value);
  }

  function goToFirstPage() {
    setPage(1);
  }
  function goToLastPage() {
    setPage(totalPages);
  }
  function goToPreviousPage() {
    setPage(page - 1);
  }
  function goToNextPage() {
    setPage(page + 1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-bold ">Participante</h1>
        <div className="flex items-center px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm gap-3">
          <Search className="size-4 text-emerald-300" />
          <input onChange={OnSerchInputChanged} className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar Participante..." />
        </div>
        {search}
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input className="size-4 bg-black/20 rounded border-white/10 " type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <input className="size-4 bg-black/20 rounded border-white/10 " type="checkbox" />
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">{attendee.id}</TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {attendee.checkedInAt === null ? <span className="text-zinc-400">"Check-in não efetuado"</span> : dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando 10 de {attendees.length} itens</TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8 ">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
