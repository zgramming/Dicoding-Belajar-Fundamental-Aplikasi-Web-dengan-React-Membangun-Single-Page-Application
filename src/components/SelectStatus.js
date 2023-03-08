import PropTypes from "prop-types";

const SelectStatus = ({ onStatusChangeHandler }) => {
  return (
    <div className="flex flex-row justify-end">
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
        onChange={(e) => {
          onStatusChangeHandler(e.target.value);
        }}
      >
        <option value={`all`} selected>
          Semua
        </option>
        <option value="archive">Arsip</option>
        <option value="not_archive">Tidak Arsip</option>
      </select>
    </div>
  );
};

SelectStatus.propTypes = {
  onStatusChangeHandler: PropTypes.func.isRequired,
};

export default SelectStatus;
