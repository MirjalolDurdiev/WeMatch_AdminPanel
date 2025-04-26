import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const TablePost = ({ opportunities, onDelete, onEdit, onDetails }) => {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[1100px]">
        <TableCaption className="mt-2">
          A list of posted opportunities.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Description</TableHead>
            <TableHead className="whitespace-nowrap">Location</TableHead>
            <TableHead className="whitespace-nowrap">
              Opportunity Type
            </TableHead>
            <TableHead className="whitespace-nowrap">
              Experience Level
            </TableHead>
            <TableHead className="whitespace-nowrap">Category</TableHead>
            <TableHead className="whitespace-nowrap">Payment Type</TableHead>
            <TableHead className="whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities && opportunities.length > 0 ? (
            opportunities.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.image ? (
                    <img
                      src={"http://localhost:3000/images/" + item.image}
                      alt={item.name}
                      className="w-[50px] h-[50px] object-cover rounded-md"
                    />
                  ) : (
                    "No image"
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {item.description}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.location}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.opportunityType}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.experienceLevel}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.category}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.paymentType}
                </TableCell>
                <TableCell className="space-x-2">
                  <button
                    onClick={() => onDetails(item.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onEdit(item.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No opportunities found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePost;
