
import React from 'react';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import DataPagination from '@/components/common/DataPagination';

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  grade: string;
  section: string;
  gender: string;
  birthdate: Date;
  age: number;
  address: string;
  email: string;
  contact: string;
  guardianName: string;
  guardianContact: string;
};

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'firstName' | 'lastName' | 'grade' | 'section' | 'gender' | 'contact' | 'email' | 'age' | null;

interface StudentTableProps {
  students: Student[];
  currentPage: number;
  totalPages: number;
  sortField: SortField;
  sortDirection: SortDirection;
  onPageChange: (page: number) => void;
  onEditStudent: (student: Student) => void;
  onSort: (field: SortField) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  currentPage,
  totalPages,
  sortField,
  sortDirection,
  onPageChange,
  onEditStudent,
  onSort
}) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>A list of all students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30 transition-colors" 
                onClick={() => onSort('firstName')}
              >
                <div className="flex items-center">
                  First Name
                  {renderSortIcon('firstName')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30 transition-colors" 
                onClick={() => onSort('lastName')}
              >
                <div className="flex items-center">
                  Last Name
                  {renderSortIcon('lastName')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30 transition-colors" 
                onClick={() => onSort('grade')}
              >
                <div className="flex items-center">
                  Grade
                  {renderSortIcon('grade')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30 transition-colors" 
                onClick={() => onSort('section')}
              >
                <div className="flex items-center">
                  Section
                  {renderSortIcon('section')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30 transition-colors" 
                onClick={() => onSort('gender')}
              >
                <div className="flex items-center">
                  Gender
                  {renderSortIcon('gender')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/30 transition-colors" 
                onClick={() => onSort('contact')}
              >
                <div className="flex items-center">
                  Contact
                  {renderSortIcon('contact')}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onEditStudent(student)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-center mt-4">
        <DataPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default StudentTable;
