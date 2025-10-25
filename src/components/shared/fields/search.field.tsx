import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
interface ISearchFieldProps {
  disabled?: boolean
}
const SearchField = ({ disabled }: ISearchFieldProps) => {
  return (
    <div className="flex items-center gap-2">
      <div>
        <Input
          type="text"
          placeholder="Search..."
          disabled={disabled}
        />
      </div>
      <Button type="button" variant="outline" disabled={disabled}>
        <Search size={18} />
        <p className='hidden md:inline md:pr-1'>
          Search
        </p>
      </Button>
    </div>
  )
}

export default SearchField
